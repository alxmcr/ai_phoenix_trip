import { InvalidFilterError } from "@/app/classes/errors/error-invalid-filter";
import { DBOperations } from "@/app/generics/db-operations";
import { Filters } from "@/app/generics/filters";
import { Pagination } from "@/app/generics/pagination";
import sql from "@/app/lib/db/database-client";
import { ReviewData } from "@/app/types/db/review";

export class ReviewDB
  implements
  DBOperations<ReviewData>,
  Pagination<ReviewData>,
  Filters<ReviewData> {
  async insert(item: ReviewData): Promise<ReviewData> {
    const [newReview] = await sql<ReviewData[]>`
      INSERT INTO review (trip_date, transport_mode, company_name, origin, destination, email, rating, review_text)
      VALUES (${item.trip_date}, ${item.transport_mode}, ${item.company_name}, ${item.origin}, ${item.destination}, ${item.email}, ${item.rating}, ${item.review_text})
      RETURNING *
    `;
    return newReview;
  }

  async read(id: string): Promise<ReviewData | null> {
    const [review] = await sql<ReviewData[]>`
      SELECT * FROM review WHERE review_id = ${id}
    `;
    return review || null;
  }

  async update(id: string, item: Partial<ReviewData>): Promise<ReviewData | null> {
    const [updatedReview] = await sql<ReviewData[]>`
      UPDATE review
      SET ${sql(item)}
      WHERE review_id = ${id}
      RETURNING *
    `;
    return updatedReview || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM review WHERE review_id = ${id}
    `;
    return result.count > 0;
  }

  async paginate(page: number, pageSize: number): Promise<ReviewData[]> {
    const offset = (page - 1) * pageSize;
    const review = await sql<ReviewData[]>`
      SELECT * FROM review
      ORDER BY created_at desc
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
    return review;
  }

  async filter(filters: Partial<ReviewData>): Promise<ReviewData[]> {
    // Validate that only valid ReviewData fields are present
    const validFields = ['review_id', 'trip_date', 'transport_mode', 'company_name', 'origin', 'destination', 'email', 'rating', 'review_text'];
    const invalidFields = Object.keys(filters).filter(
      field => !validFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new InvalidFilterError(
        `Invalid filter fields: ${invalidFields.join(', ')}. Valid fields are: ${validFields.join(', ')}`
      );
    }

    const conditions = [];

    if (filters.review_id) {
      conditions.push(sql`review_id = ${filters.review_id}`);
    }

    if (filters.trip_date) {
      conditions.push(sql`trip_date = ${filters.trip_date}`);
    }

    if (filters.transport_mode) {
      conditions.push(sql`transport_mode = ${filters.transport_mode}`);
    }

    if (filters.company_name) {
      conditions.push(sql`company_name = ${filters.company_name}`);
    }

    if (filters.origin) {
      conditions.push(sql`origin = ${filters.origin}`);
    }

    if (filters.destination) {
      conditions.push(sql`destination = ${filters.destination}`);
    }

    if (filters.email) {
      conditions.push(sql`email = ${filters.email}`);
    }

    if (filters.rating) {
      conditions.push(sql`rating = ${filters.rating}`);
    }

    if (filters.review_text) {
      conditions.push(sql`review_text = ${filters.review_text}`);
    }

    if (filters.created_at) {
      conditions.push(sql`created_at = ${filters.created_at}`);
    }

    if (filters.updated_at) {
      conditions.push(sql`updated_at = ${filters.updated_at}`);
    }

    const whereClause = conditions.length > 0
      ? sql`WHERE ${conditions.reduce((acc, condition) => sql`${acc} AND ${condition}`)}`
      : sql``;

    const review = await sql<ReviewData[]>`
      SELECT *
      FROM review
      ${whereClause}
      ORDER BY review_id DESC
    `;

    return review;
  }
}