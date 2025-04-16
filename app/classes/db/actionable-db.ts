import { CRUD } from "@/app/generics/crud";
import { Filters } from "@/app/generics/filters";
import { Pagination } from "@/app/generics/pagination";
import sql from "@/app/lib/db/database-client";
import { ActionableData } from "@/app/types/db/actionable";
import { InvalidFilterError } from "@/app/classes/errors/error-invalid-filter";

export class ActionableDB
  implements
    CRUD<ActionableData>,
    Pagination<ActionableData>,
    Filters<ActionableData>
{
  async create(item: ActionableData): Promise<ActionableData> {
    const [newActionable] = await sql<ActionableData[]>`
      INSERT INTO actionable (action_text, review_id)
      VALUES (${item.action_text}, ${item.review_id})
      RETURNING *
    `;
    return newActionable;
  }

  async read(id: string): Promise<ActionableData | null> {
    console.log("🚀 ~ read ~ id:", id);
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
      ORDER BY actionable_id
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

    if (filters.action_text) {
      conditions.push(sql`action_text = ${filters.action_text}`);
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

    const actionable = await sql<ActionableData[]>`
      SELECT *
      FROM actionable
      ${whereClause}
      ORDER BY actionable_id DESC
    `;

    return actionable;
  }
}
