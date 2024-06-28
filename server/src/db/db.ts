import { Pool, PoolClient, QueryResult } from "pg";
import { consoleLogCyan, consoleLogRed } from "../utils/colorConsoleLogging";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DBNAME,
});

export const testDatabaseConnection = async () => {
    try {
        const client = await pool.connect();

        try {
            await client.query("SELECT 1");

            consoleLogCyan(
                "Database connection to Postgres Database successful :)"
            );
        } finally {
            client.release();
        }
    } catch (error) {
        consoleLogRed("Connection to Postgres Database failed :(");
        console.log(error);
    }
};

export const queryClient = async (
    client: PoolClient,
    query: string,
    params: any[] | null = null
): Promise<QueryResult> => {
    const result = params
        ? await client.query(query, params)
        : await client.query(query);
    return result;
};

export const transaction = async (
    operations: (client: PoolClient) => Promise<any>
) => {
    try {
        const client: PoolClient = await pool.connect();
        try {
            await queryClient(client, "BEGIN");
            await operations(client);
            await queryClient(client, "COMMIT");
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        throw err;
    }
};
