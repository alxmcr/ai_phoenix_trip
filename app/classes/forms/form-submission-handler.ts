import { ReviewAnalysis } from "../open-ai/review-analysis";
import { buildPromptReview } from "@/app/helpers/ai/prompt-review";
import { ResponseOpenAITravelReviewAnalysis } from "@/app/types/ai/openai-response";
import { ReviewData } from "@/app/types/db/review";
import { TimingUtils } from "../utils/timing-utils";

export class FormSubmissionHandler {
  private reviewAnalysis: ReviewAnalysis;

  constructor() {
    this.reviewAnalysis = new ReviewAnalysis();
  }

  private async submitReview(formData: ReviewData): Promise<string> {
    TimingUtils.start("Review Submission");
    const reviewResponse = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const review = await reviewResponse.json();
    const review_id = review.review_id;

    if (!review_id) {
      throw new Error("Invalid review");
    }

    TimingUtils.log("Review Submission", `Review submitted successfully with ID: ${review_id}`);
    return review_id;
  }

  private async analyzeReview(review: ReviewData): Promise<ResponseOpenAITravelReviewAnalysis> {
    TimingUtils.start("Analysis");
    const prompt = buildPromptReview(review);

    this.reviewAnalysis.setPrompt(prompt);
    this.reviewAnalysis.setReview(review);

    const resultsAnalysis = await this.reviewAnalysis.analyzeReview();
    this.reviewAnalysis.setAnalysis(resultsAnalysis);

    const analysis = this.reviewAnalysis.getAnalysis();
    if (!analysis) {
      throw new Error("Analysis is not valid");
    }

    TimingUtils.log("Analysis", "Review analysis completed successfully");
    return analysis;
  }

  private async submitSentiment(review_id: string, sentiment: any) {
    TimingUtils.start("Sentiment");
    await fetch("/api/sentiment", {
      method: "POST",
      body: JSON.stringify(sentiment),
    });
    TimingUtils.log("Sentiment", "Sentiment submitted successfully");
  }

  private async submitActionables(review_id: string, actionables: any[]) {
    TimingUtils.start("Actionables");
    const actionableBatches = [];
    const batchSize = 5;

    for (let i = 0; i < actionables.length; i += batchSize) {
      const batch = actionables.slice(i, i + batchSize);
      const batchPromises = batch.map(actionable =>
        fetch("/api/actionables", {
          method: "POST",
          body: JSON.stringify({
            ...actionable,
            review_id: review_id
          }),
        })
      );
      actionableBatches.push(Promise.all(batchPromises));
    }

    await Promise.all(actionableBatches);
    TimingUtils.log("Actionables", `Successfully submitted ${actionables.length} actionables`);
  }

  private async submitRecommendations(review_id: string, recommendations: any[]) {
    TimingUtils.start("Recommendations");
    const recommendationBatches = [];
    const batchSize = 5;

    for (let i = 0; i < recommendations.length; i += batchSize) {
      const batch = recommendations.slice(i, i + batchSize);
      const batchPromises = batch.map(recommendation =>
        fetch("/api/recommendations", {
          method: "POST",
          body: JSON.stringify({
            ...recommendation,
            review_id: review_id
          }),
        })
      );
      recommendationBatches.push(Promise.all(batchPromises));
    }

    await Promise.all(recommendationBatches);
    TimingUtils.log("Recommendations", `Successfully submitted ${recommendations.length} recommendations`);
  }

  private calculateTimeout(itemsCount: number, baseTimeout: number, perItemTimeout: number): number {
    // Ensure minimum timeout for small batches
    const minTimeout = 3000;
    // Calculate timeout based on number of items
    const calculatedTimeout = baseTimeout + (itemsCount * perItemTimeout);
    // Cap the maximum timeout to prevent extremely long waits
    const maxTimeout = 30000;
    return Math.min(Math.max(calculatedTimeout, minTimeout), maxTimeout);
  }

  private async submitWithTimeout<T>(
    operation: () => Promise<T>,
    label: string,
    timeoutMs: number = 10000
  ): Promise<{ result?: T; timedOut: boolean }> {
    TimingUtils.start(label);

    try {
      const result = await Promise.race([
        operation().then(result => ({ result, timedOut: false })),
        new Promise<{ result?: T; timedOut: boolean }>((resolve) =>
          setTimeout(() => resolve({ timedOut: true }), timeoutMs)
        )
      ]);

      if (result.timedOut) {
        TimingUtils.log(label, `Operation timed out after ${timeoutMs}ms (continuing in background)`);
        return result;
      }

      TimingUtils.log(label, "Operation completed successfully");
      return result;
    } catch (error) {
      TimingUtils.log(label, `Operation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    }
  }

  public async handleFormSubmission(formData: ReviewData): Promise<string> {
    TimingUtils.start("Form Submission");

    try {
      // Step 1: Submit the review (critical operation)
      const reviewResult = await this.submitWithTimeout(
        () => this.submitReview(formData),
        "Review Submission",
        5000 // Base timeout for review submission
      );

      if (reviewResult.timedOut) {
        throw new Error("Review submission timed out - this is a critical operation");
      }

      const review_id = reviewResult.result!;

      // Step 2: Analyze the review (critical operation)
      const analysisResult = await this.submitWithTimeout(
        () => this.analyzeReview(formData),
        "Analysis",
        15000 // Base timeout for analysis
      );

      if (analysisResult.timedOut) {
        throw new Error("Analysis timed out - this is a critical operation");
      }

      const { sentiment, actionables, recommendations } = analysisResult.result!;

      // Step 3: Submit all analysis data with dynamic timeouts
      // Start with sentiment as it's usually the fastest
      const sentimentResult = await this.submitWithTimeout(
        () => this.submitSentiment(review_id, sentiment),
        "Sentiment",
        3000 // Base timeout for sentiment
      );

      if (sentimentResult.timedOut) {
        console.warn("Sentiment submission timed out, continuing with other operations");
      }

      // Calculate timeouts based on number of items
      const actionablesTimeout = this.calculateTimeout(
        actionables.length,
        3000, // Base timeout for first item
        1000  // Additional timeout per item
      );

      const recommendationsTimeout = this.calculateTimeout(
        recommendations.length,
        2000, // Base timeout for first item
        800   // Additional timeout per item
      );

      // Then handle actionables and recommendations in parallel
      const [actionablesResult, recommendationsResult] = await Promise.all([
        this.submitWithTimeout(
          () => this.submitActionables(review_id, actionables),
          "Actionables",
          actionablesTimeout
        ),
        this.submitWithTimeout(
          () => this.submitRecommendations(review_id, recommendations),
          "Recommendations",
          recommendationsTimeout
        )
      ]);

      // Log timeouts but don't block the process
      if (actionablesResult.timedOut) {
        console.warn(`Actionables submission timed out after ${actionablesTimeout}ms (continuing in background)`);
      }
      if (recommendationsResult.timedOut) {
        console.warn(`Recommendations submission timed out after ${recommendationsTimeout}ms (continuing in background)`);
      }

      TimingUtils.log("Form Submission", "Form submission completed successfully");
      return review_id;
    } catch (error) {
      TimingUtils.log("Error", `Form submission failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    }
  }
}