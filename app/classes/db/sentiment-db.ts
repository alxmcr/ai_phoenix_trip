import { InvalidFilterError } from "@/app/classes/errors/error-invalid-filter";
import { DBOperations } from "@/app/generics/db-operations";
import { Filters } from "@/app/generics/filters";
import { Pagination } from "@/app/generics/pagination";
import sql from "@/app/config/db/database-client";
import { SentimentData } from "@/app/types/db/sentiment";

export class SentimentDB
  implements
    DBOperations<SentimentData>,
    Pagination<SentimentData>,
    Filters<SentimentData>
{
  async insert(item: Partial<SentimentData>): Promise<SentimentData> {
    // Check if the review id is valid
    if (!item.review_id) {
      throw new Error("Review ID is required");
    }

    // check if the score is valid
    if (!item.score) {
      throw new Error("Score is required");
    }

    // check if the label is valid
    if (!item.label) {
      throw new Error("Label is required");
    }

    // check if the summary is valid
    if (!item.summary) {
      throw new Error("Summary is required");
    }

    // check if the emotion tone is valid
    if (!item.emotion_tone) {
      throw new Error("Emotion Tone is required");
    }

    const [newSentiment] = await sql<SentimentData[]>`
      INSERT INTO sentiment (review_id, score, "label", summary, emotion_tone)
      VALUES (${item.review_id}, ${item.score}, ${item.label}, ${item.summary}, ${item.emotion_tone})
      RETURNING *
    `;
    return newSentiment;
  }

  async insertMany(
    sentiments: Partial<SentimentData>[]
  ): Promise<SentimentData[]> {
    // check it the sentiments are empty
    if (sentiments.length === 0) {
      throw new Error("Sentiments are empty");
    }

    // call the insert method for each sentiments
    const sentimentsCreated = await Promise.all(
      sentiments.map((sentiment) => this.insert(sentiment))
    );

    return sentimentsCreated;
  }

  async read(id: string): Promise<SentimentData | null> {
    const [sentiment] = await sql<SentimentData[]>`
      SELECT * FROM sentiment WHERE sentiment_id = ${id}
    `;
    return sentiment || null;
  }

  async update(
    id: string,
    item: Partial<SentimentData>
  ): Promise<SentimentData | null> {
    const [updatedSentiment] = await sql<SentimentData[]>`
      UPDATE sentiment
      SET ${sql(item)}
      WHERE sentiment_id = ${id}
      RETURNING *
    `;
    return updatedSentiment || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM sentiment WHERE sentiment_id = ${id}
    `;
    return result.count > 0;
  }

  async paginate(page: number, pageSize: number): Promise<SentimentData[]> {
    const offset = (page - 1) * pageSize;
    const sentiment = await sql<SentimentData[]>`
      SELECT * FROM sentiment
      ORDER BY created_at desc
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
    return sentiment;
  }

  async filter(filters: Partial<SentimentData>): Promise<SentimentData[]> {
    // Validate that only valid SentimentData fields are present
    const validFields = ["sentiment_id", "sentiment_text", "review_id"];
    const invalidFields = Object.keys(filters).filter(
      (field) => !validFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new InvalidFilterError(
        `Invalid filter fields: ${invalidFields.join(
          ", "
        )}. Valid fields are: ${validFields.join(", ")}`
      );
    }

    const conditions = [];

    // Check if the review id is valid
    if (filters.review_id) {
      conditions.push(sql`review_id = ${filters.review_id}`);
    }

    // check if the score is valid
    if (filters.score) {
      conditions.push(sql`score = ${filters.score}`);
    }

    // check if the label is valid
    if (filters.label) {
      conditions.push(sql`label = ${filters.label}`);
    }

    // check if the summary is valid
    if (filters.summary) {
      conditions.push(sql`summary = ${filters.summary}`);
    }

    // check if the emotion tone is valid
    if (filters.emotion_tone) {
      conditions.push(sql`emotion_tone = ${filters.emotion_tone}`);
    }

    const whereClause =
      conditions.length > 0
        ? sql`WHERE ${conditions.reduce(
            (acc, condition) => sql`${acc} AND ${condition}`
          )}`
        : sql``;

    const sentiment = await sql<SentimentData[]>`
      SELECT *
      FROM sentiment
      ${whereClause}
      ORDER BY sentiment_id DESC
    `;

    return sentiment;
  }

  async getAverageSentimentScore(): Promise<number> {
    // get the average sentiment score of the reviews
    const [result] = await sql<{ average_sentiment_score: number }[]>`
      SELECT AVG(score) as average_sentiment_score FROM sentiment
    `;
    return Number(result.average_sentiment_score);
  }

  async getAverageSentimentScoreInPastMonth(): Promise<number> {
    // get the average sentiment score of the reviews in the past month
    const [result] = await sql<{ average_sentiment_score: number }[]>`
      SELECT AVG(score) as average_sentiment_score FROM sentiment WHERE created_at >= NOW() - INTERVAL '1 month'
    `;
    return Number(result.average_sentiment_score);
  }
}
