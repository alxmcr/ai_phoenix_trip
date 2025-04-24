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

  public async handleFormSubmission(formData: ReviewData): Promise<string> {
    TimingUtils.start("Form Submission");

    try {
      // Step 1: Submit the review
      const review_id = await this.submitReview(formData);

      // Step 2: Analyze the review
      const analysis = await this.analyzeReview(formData);
      const { sentiment, actionables, recommendations } = analysis;

      // Step 3: Submit all analysis data
      await Promise.all([
        this.submitSentiment(review_id, sentiment),
        this.submitActionables(review_id, actionables),
        this.submitRecommendations(review_id, recommendations)
      ]);

      TimingUtils.log("Form Submission", "Form submission completed successfully");
      return review_id;
    } catch (error) {
      TimingUtils.log("Error", `Form submission failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    }
  }
}