import { InvalidFilterError } from "@/app/classes/errors/error-invalid-filter";
import { DBOperations } from "@/app/generics/db-operations";
import { Filters } from "@/app/generics/filters";
import { Pagination } from "@/app/generics/pagination";
import sql from "@/app/lib/db/database-client";
import { SentimentData } from "@/app/types/db/sentiment";

export class SentimentDB
  implements
    DBOperations<SentimentData>,
    Pagination<SentimentData>,
    Filters<SentimentData>
{
  async insert(item: SentimentData): Promise<SentimentData> {
    const [newSentiment] = await sql<SentimentData[]>`
      INSERT INTO sentiment (sentiment_text, review_id)
      VALUES (${item.sentiment_text}, ${item.review_id})
      RETURNING *
    `;
    return newSentiment;
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

    if (filters.sentiment_text) {
      conditions.push(sql`sentiment_text = ${filters.sentiment_text}`);
    }

    if (filters.review_id) {
      conditions.push(sql`review_id = ${filters.review_id}`);
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
}
