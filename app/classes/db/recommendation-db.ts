import { InvalidFilterError } from "@/app/classes/errors/error-invalid-filter";
import { DBOperations } from "@/app/generics/db-operations";
import { Filters } from "@/app/generics/filters";
import { Pagination } from "@/app/generics/pagination";
import sql from "@/app/config/db/database-client";
import { RecommendationData } from "@/app/types/db/recommendation";

export class RecommendationDB
  implements
    DBOperations<RecommendationData>,
    Pagination<RecommendationData>,
    Filters<RecommendationData>
{
  async insert(item: Partial<RecommendationData>): Promise<RecommendationData> {
    // Check if the review_id is not null or undefined
    if (!item.review_id) {
      throw new Error("Review ID is required");
    }

    // Check if the title is not null or undefined
    if (!item.title) {
      throw new Error("Title is required");
    }

    // Check if the description is not null or undefined
    if (!item.description) {
      throw new Error("Description is required");
    }

    // Check if the impact is not null or undefined
    if (!item.impact) {
      throw new Error("Impact is required");
    }

    // Check if the target_area is not null or undefined
    if (!item.target_area) {
      throw new Error("Target Area is required");
    }

    // Check if the effort_level is not null or undefined
    if (!item.effort_level) {
      throw new Error("Effort Level is required");
    }

    // Check if the data_driven is not null or undefined
    if (!item.data_driven) {
      throw new Error("Data Driven is required");
    }

    const [newRecommendation] = await sql<RecommendationData[]>`
      INSERT INTO recommendation (review_id, title, description, impact, target_area, effort_level, data_driven)
      VALUES (${item.review_id}, ${item.title}, ${item.description}, ${item.impact}, ${item.target_area}, ${item.effort_level}, ${item.data_driven})
      RETURNING *
    `;
    return newRecommendation;
  }

  async insertMany(
    recommendations: Partial<RecommendationData>[]
  ): Promise<RecommendationData[]> {
    // check it the recommendations are empty
    if (recommendations.length === 0) {
      throw new Error("Recommendations are empty");
    }

    // call the insert method for each recommendations
    const recommendationsCreated = await Promise.all(
      recommendations.map((recommendation) => this.insert(recommendation))
    );

    return recommendationsCreated;
  }

  async read(id: string): Promise<RecommendationData | null> {
    const [recommendation] = await sql<RecommendationData[]>`
      SELECT * FROM recommendation WHERE recommendation_id = ${id}
    `;
    return recommendation || null;
  }

  async update(
    id: string,
    item: Partial<RecommendationData>
  ): Promise<RecommendationData | null> {
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

  async paginate(
    page: number,
    pageSize: number
  ): Promise<RecommendationData[]> {
    const offset = (page - 1) * pageSize;
    return await sql<RecommendationData[]>`
      SELECT * FROM recommendation
      ORDER BY created_at desc
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }

  async filter(
    filters: Partial<RecommendationData>
  ): Promise<RecommendationData[]> {
    // Validate that only valid RecommendationData fields are present
    const validFields = [
      "recommendation_id",
      "recommendation_text",
      "review_id",
    ];
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

    // Check if the review_id is not null or undefined
    if (filters.review_id) {
      conditions.push(sql`review_id = ${filters.review_id}`);
    }

    // Check if the title is not null or undefined
    if (filters.title) {
      conditions.push(sql`title = ${filters.title}`);
    }

    // Check if the description is not null or undefined
    if (filters.description) {
      conditions.push(sql`description = ${filters.description}`);
    }

    // Check if the impact is not null or undefined
    if (filters.impact) {
      conditions.push(sql`impact = ${filters.impact}`);
    }

    // Check if the target_area is not null or undefined
    if (filters.target_area) {
      conditions.push(sql`target_area = ${filters.target_area}`);
    }

    // Check if the effort_level is not null or undefined
    if (filters.effort_level) {
      conditions.push(sql`effort_level = ${filters.effort_level}`);
    }

    // Check if the data_driven is not null or undefined
    if (filters.data_driven) {
      conditions.push(sql`data_driven = ${filters.data_driven}`);
    }

    const whereClause =
      conditions.length > 0
        ? sql`WHERE ${conditions.reduce(
            (acc, condition) => sql`${acc} AND ${condition}`
          )}`
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
