import { InvalidFilterError } from "@/app/classes/errors/error-invalid-filter";
import { DBOperations } from "@/app/generics/db-operations";
import { Filters } from "@/app/generics/filters";
import { Pagination } from "@/app/generics/pagination";
import sql from "@/app/config/db/database-client";
import { ReviewData } from "@/app/types/db/review";

export class ReviewDB
  implements
    DBOperations<ReviewData>,
    Pagination<ReviewData>,
    Filters<ReviewData>
{
  async insert(review: Partial<ReviewData>): Promise<ReviewData> {
    // check if the review is empty
    if (Object.keys(review).length === 0) {
      throw new Error("Review is empty");
    }

    // check if the email is empty
    if (!review.email) {
      throw new Error("Email is empty");
    }

    // check if the age_group is empty
    if (!review.age_group) {
      throw new Error("Age group is empty");
    }

    // check if the trip_type is empty
    if (!review.trip_type) {
      throw new Error("Trip type is empty");
    }

    // check if the description is empty
    if (!review.description) {
      throw new Error("Description is empty");
    }

    // check if the transport_mode is empty
    if (!review.transport_mode) {
      throw new Error("Transport mode is empty");
    }

    // check if the rating is empty
    if (!review.rating) {
      throw new Error("Rating is empty");
    }

    // check if the company_name is empty
    if (!review.company_name) {
      throw new Error("Company name is empty");
    }

    // check if the origin is empty
    if (!review.origin) {
      throw new Error("Origin is empty");
    }

    // check if the destination is empty
    if (!review.destination) {
      throw new Error("Destination is empty");
    }

    // check if the start_date is empty
    if (!review.start_date) {
      throw new Error("Start date is empty");
    }

    // check if the end_date is empty
    if (!review.end_date) {
      throw new Error("End date is empty");
    }

    const [newReview] = await sql<ReviewData[]>`
      INSERT INTO review (email, age_group, trip_type, description, transport_mode, rating, company_name, origin, destination, start_date, end_date)
      VALUES (${review.email}, ${review.age_group}, ${review.trip_type}, ${review.description}, ${review.transport_mode}, ${review.rating}, ${review.company_name}, ${review.origin}, ${review.destination}, ${review.start_date}, ${review.end_date})
      RETURNING *
    `;
    return newReview;
  }

  async insertMany(reviews: ReviewData[]): Promise<ReviewData[]> {
    // check it the reviews are empty
    if (reviews.length === 0) {
      throw new Error("Reviews are empty");
    }

    // call the insert method for each reviews
    const reviewsCreated = await Promise.all(
      reviews.map((review) => this.insert(review))
    );

    return reviewsCreated;
  }

  async read(id: string): Promise<ReviewData | null> {
    const [review] = await sql<ReviewData[]>`
      SELECT * FROM review WHERE review_id = ${id}
    `;
    return review || null;
  }

  async update(
    id: string,
    item: Partial<ReviewData>
  ): Promise<ReviewData | null> {
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
    const validFields = [
      "review_id",
      "trip_date",
      "transport_mode",
      "company_name",
      "origin",
      "destination",
      "email",
      "rating",
      "review_text",
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

    // check if the review is empty
    if (filters.review_id) {
      conditions.push(sql`review_id = ${filters.review_id}`);
    }

    // check if the email is empty
    if (filters.email) {
      conditions.push(sql`email ILIKE ${`%${filters.email}%`}`);
    }

    // check if the age_group is empty
    if (filters.age_group) {
      conditions.push(sql`age_group ILIKE ${`%${filters.age_group}%`}`);
    }

    // check if the trip_type is empty
    if (filters.trip_type) {
      conditions.push(sql`trip_type ILIKE ${`%${filters.trip_type}%`}`);
    }

    // check if the description is empty
    if (filters.description) {
      conditions.push(sql`description ILIKE ${`%${filters.description}%`}`);
    }

    // check if the transport_mode is empty
    if (filters.transport_mode) {
      conditions.push(sql`transport_mode ILIKE ${`%${filters.transport_mode}%`}`);
    }

    // check if the rating is empty
    if (filters.rating) {
      conditions.push(sql`rating = ${filters.rating}`);
    }

    // check if the company_name is empty
    if (filters.company_name) {
      conditions.push(sql`company_name ILIKE ${`%${filters.company_name}%`}`);
    }

    // check if the origin is empty
    if (filters.origin) {
      conditions.push(sql`origin ILIKE ${`%${filters.origin}%`}`);
    }

    // check if the destination is empty
    if (filters.destination) {
      conditions.push(sql`destination ILIKE ${`%${filters.destination}%`}`);
    }

    // check if the start_date is empty
    if (filters.start_date) {
      conditions.push(sql`start_date = ${filters.start_date}`);
    }

    // check if the end_date is empty
    if (filters.end_date) {
      conditions.push(sql`end_date = ${filters.end_date}`);
    }

    const whereClause =
      conditions.length > 0
        ? sql`WHERE ${conditions.reduce(
            (acc, condition) => sql`${acc} AND ${condition}`
          )}`
        : sql``;

    const review = await sql<ReviewData[]>`
      SELECT *
      FROM review
      ${whereClause}
      ORDER BY review_id DESC
    `;

    return review;
  }

  async count(): Promise<number> {
    // get the total number of reviews
    const [result] = await sql<{ count: number }[]>`
      SELECT COUNT(*) FROM review
    `;
    return Number(result.count);
  }

  // get count of reviews in the past month
  async getCountOfReviewsInPastMonth(): Promise<number> {
    // get the total number of reviews
    const [result] = await sql<{ count: number }[]>`
      SELECT COUNT(*) FROM review WHERE created_at >= NOW() - INTERVAL '1 month'
    `;
    return Number(result.count);
  }

  async getAverageRating(): Promise<number> {
    // get the average rating of the reviews
    const [result] = await sql<{ average_rating: number }[]>`
      SELECT AVG(rating) as average_rating FROM review
    `;

    return Number(result.average_rating);
  }

  async getAverageRatingInPastMonth(): Promise<number> {
    // get the average rating of the reviews in the past month
    const [result] = await sql<{ average_rating: number }[]>`
      SELECT AVG(rating) as average_rating FROM review WHERE created_at >= NOW() - INTERVAL '1 month'
    `;
    return Number(result.average_rating);
  }
}
