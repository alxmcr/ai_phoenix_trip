import { CRUD } from "../../generics/crud";
import { Filters } from "../../generics/filters";
import { Pagination } from "../../generics/pagination";
import sql from "../../lib/db/database-client";
import { InvalidFilterError } from "../../middleware/error-handler";
import { RecommendationData } from "../../types/db/recommendation";

export class RecommendationDB
  implements
  CRUD<RecommendationData>,
  Pagination<RecommendationData>,
  Filters<RecommendationData> {
  async create(item: RecommendationData): Promise<RecommendationData> {
    const [newRecommendation] = await sql<RecommendationData[]>`
      INSERT INTO recommendation (recommendation_text, review_id)
      VALUES (${item.recommendation_text}, ${item.review_id})
      RETURNING *
    `;
    return newRecommendation;
  }

  async read(id: string): Promise<RecommendationData | null> {
    const [recommendation] = await sql<RecommendationData[]>`
      SELECT * FROM recommendation WHERE recommendation_id = ${id}
    `;
    return recommendation || null;
  }

  async update(id: string, item: Partial<RecommendationData>): Promise<RecommendationData | null> {
    const [updatedRecommendation] = await sql<RecommendationData[]>`
    UPDATE recommendation
    SET ${sql(item)}
    WHERE recommendation_id = ${id}
    RETURNING *
  `;
    return updatedRecommendation || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM recommendation WHERE recommendation_id = ${id}
    `;
    return result.count > 0;
  }

  async paginate(page: number, pageSize: number): Promise<RecommendationData[]> {
    const offset = (page - 1) * pageSize;
    return await sql<RecommendationData[]>`
      SELECT * FROM recommendation
      ORDER BY recommendation_id
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }

  async filter(filters: Partial<RecommendationData>): Promise<RecommendationData[]> {
    // Validate that only valid RecommendationData fields are present
    const validFields = ['recommendation_id', 'recommendation_text', 'review_id'];
    const invalidFields = Object.keys(filters).filter(
      field => !validFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new InvalidFilterError(
        `Invalid filter fields: ${invalidFields.join(', ')}. Valid fields are: ${validFields.join(', ')}`
      );
    }

    const conditions = [];

    if (filters.recommendation_text) {
      conditions.push(sql`recommendation_text = ${filters.recommendation_text}`);
    }

    if (filters.review_id) {
      conditions.push(sql`review_id = ${filters.review_id}`);
    }

    const whereClause = conditions.length > 0
      ? sql`WHERE ${conditions.reduce((acc, condition) => sql`${acc} AND ${condition}`)}`
      : sql``;

    const recommendation = await sql<RecommendationData[]>`
         SELECT *
         FROM recommendation
         ${whereClause}
         ORDER BY recommendation_id DESC
       `;

    return recommendation;
  }
}
