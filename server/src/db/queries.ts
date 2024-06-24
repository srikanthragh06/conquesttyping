import { PoolClient, QueryResult } from "pg";
import { queryClient } from "./db";

interface RecordValues {
    [key: string]: any;
}

interface Conditions {
    [key: string]: any;
}

export const insertRecord = async (
    client: PoolClient,
    table: string,
    values: RecordValues,
    returning: string = "id"
): Promise<any> => {
    const columns = Object.keys(values)
        .map((col) => `"${col}"`)
        .join(", ");
    const placeholders = Object.values(values)
        .map((_, index) => `$${index + 1}`)
        .join(", ");
    const conditionValues = Object.values(values);

    const query = `INSERT INTO "${table}" (${columns}) VALUES (${placeholders}) RETURNING ${returning}`;

    const result = await queryClient(client, query, conditionValues);
    return result.rows[0];
};

export const updateRecords = async (
    client: PoolClient,
    table: string,
    updates: RecordValues,
    conditions: Conditions
): Promise<QueryResult> => {
    let setClause = "";
    const updateValues = [];
    let index = 1;
    for (const [key, value] of Object.entries(updates)) {
        setClause += `"${key}" = $${index}, `;
        updateValues.push(value);
        index++;
    }
    setClause = setClause.slice(0, -2);

    let whereClause = "";
    const conditionValues = [];
    for (const [key, value] of Object.entries(conditions)) {
        whereClause += `"${key}" = $${index} AND `;
        conditionValues.push(value);
        index++;
    }
    whereClause = whereClause.slice(0, -5);

    const query = `
        UPDATE "${table}"
        SET ${setClause}
        WHERE ${whereClause};
    `;

    const values = [...updateValues, ...conditionValues];
    return await queryClient(client, query, values);
};

export const deleteRecords = async (
    client: PoolClient,
    table: string,
    condition?: Conditions
): Promise<QueryResult> => {
    let query = `DELETE FROM "${table}"`;
    const values: any[] = [];

    if (condition && Object.keys(condition).length > 0) {
        query += " WHERE ";

        const conditions = Object.entries(condition).map(
            ([key, value], index) => {
                values.push(value);
                return `"${key}" = $${index + 1}`;
            }
        );

        query += conditions.join(" AND ");
    }

    return await queryClient(client, query, values);
};

export const findAllWithCondition = async (
    client: PoolClient,
    table: string,
    columns?: string[],
    condition: Conditions = {}
): Promise<any[]> => {
    let query = `SELECT ${
        columns ? columns.map((col) => `"${col}"`).join(", ") : "*"
    } FROM "${table}"`;

    const values = [];
    const conditions = [];

    for (const [key, value] of Object.entries(condition)) {
        conditions.push(`"${key}" = $${values.length + 1}`);
        values.push(value);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const result = await queryClient(client, query, values);
    return result.rows;
};

export const findOneWithCondition = async (
    client: PoolClient,
    table: string,
    columns?: string[],
    condition: Conditions = {}
): Promise<any> => {
    let query = `SELECT ${
        columns ? columns.map((col) => `"${col}"`).join(", ") : "*"
    } FROM "${table}"`;

    const values = [];
    const conditions = [];

    for (const [key, value] of Object.entries(condition)) {
        conditions.push(`"${key}" = $${values.length + 1}`);
        values.push(value);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const result = await queryClient(client, query, values);
    return result.rows[0];
};
