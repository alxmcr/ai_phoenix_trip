import { InvalidFilterError } from "@/app/classes/errors/error-invalid-filter";
import { DBOperations } from "@/app/generics/db-operations";
import { Filters } from "@/app/generics/filters";
import { Pagination } from "@/app/generics/pagination";
import sql from "@/app/config/db/database-client";
import { ActionableData } from "@/app/types/db/actionable";
import { ReviewData } from "@/app/types/db/review";

export class ActionableDB
  implements
    DBOperations<ActionableData>,
    Pagination<ActionableData>,
    Filters<ActionableData>
{
  async insert(item: Partial<ActionableData>): Promise<ActionableData> {
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

    // Check if the priority is not null or undefined
    if (!item.priority) {
      throw new Error("Priority is required");
    }

    // Check if the department is not null or undefined
    if (!item.department) {
      throw new Error("Department is required");
    }

    // Check if the category is not null or undefined
    if (!item.category) {
      throw new Error("Category is required");
    }

    // Check if the source_aspect is not null or undefined
    if (!item.source_aspect) {
      throw new Error("Source Aspect is required");
    }

    // Check if the review_id exists
    const [review] = await sql<ReviewData[]>`
      SELECT * FROM review WHERE review_id = ${item.review_id}
    `;

    if (!review) {
      throw new Error("Review not found");
    } else {
      const [newActionable] = await sql<ActionableData[]>`
        INSERT INTO actionable (review_id, title, description, priority, department, category, source_aspect)
        VALUES (${item.review_id}, ${item.title}, ${item.description}, ${item.priority}, ${item.department}, ${item.category}, ${item.source_aspect})
        RETURNING *
      `;
      return newActionable;
    }
  }

  async insertMany(
    actionables: Partial<ActionableData>[] = []
  ): Promise<ActionableData[]> {
    // check it the actionables are empty
    if (actionables.length === 0) {
      throw new Error("Actionables are empty");
    }

    // call the insert method for each actionable
    const actionablesCreated = await Promise.all(
      actionables.map((actionable) => this.insert(actionable))
    );

    return actionablesCreated;
  }

  async read(id: string): Promise<ActionableData | null> {
    const [actionable] = await sql<ActionableData[]>`
      SELECT * FROM actionable WHERE actionable_id = ${id}
    `;
    return actionable || null;
  }

  async update(
    id: string,
    item: Partial<ActionableData>
  ): Promise<ActionableData | null> {
    const [updatedActionable] = await sql<ActionableData[]>`
    UPDATE actionable
    SET ${sql(item)}
    WHERE actionable_id = ${id}
    RETURNING *
  `;
    return updatedActionable || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM actionable WHERE actionable_id = ${id}
    `;
    return result.count > 0;
  }

  async paginate(page: number, pageSize: number): Promise<ActionableData[]> {
    const offset = (page - 1) * pageSize;
    return await sql<ActionableData[]>`
      SELECT * FROM actionable
      ORDER BY created_at desc
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }

  async filter(filters: Partial<ActionableData>): Promise<ActionableData[]> {
    // Validate that only valid ActionableData fields are present
    const validFields = ["actionable_id", "action_text", "review_id"];
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

    // Check if the priority is not null or undefined
    if (filters.priority) {
      conditions.push(sql`priority = ${filters.priority}`);
    }

    // Check if the department is not null or undefined
    if (filters.department) {
      conditions.push(sql`department = ${filters.department}`);
    }

    // Check if the category is not null or undefined
    if (filters.category) {
      conditions.push(sql`category = ${filters.category}`);
    }

    // Check if the source_aspect is not null or undefined
    if (filters.source_aspect) {
      conditions.push(sql`source_aspect = ${filters.source_aspect}`);
    }

    const whereClause =
      conditions.length > 0
        ? sql`WHERE ${conditions.reduce(
            (acc, condition) => sql`${acc} AND ${condition}`
          )}`
        : sql``;

    const actionable = await sql<ActionableData[]>`
      SELECT *
      FROM actionable
      ${whereClause}
      ORDER BY actionable_id DESC
    `;

    return actionable;
  }

  async count(): Promise<number> {
    // get the total number of actionables
    const [result] = await sql<{ count: number }[]>`
      SELECT COUNT(*) FROM actionable
    `;
    return Number(result.count);
  }

  async getCountOfActionablesInPastMonth(): Promise<number> {
    // get the total number of actionables in the past month
    const [result] = await sql<{ count: number }[]>`
      SELECT COUNT(*) FROM actionable WHERE created_at >= NOW() - INTERVAL '1 month'
    `;
    return Number(result.count);
  }
}
