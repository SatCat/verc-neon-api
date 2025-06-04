import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"; 
type Sql = ReturnType<typeof postgres>;

const VERC_NEON_DB_URL = Deno.env.get("VERC_NEON_DB_URL")

export default async (req: Request) => {
    if (req.method === "POST") {
        // нужно запросить из базы все batch_ts
        const sql: Sql = postgres(VERC_NEON_DB_URL);
        const get_time = JSON.stringify(await sql`select now();`);
        await sql.close();

        return new Response(`SQL result: ${get_time}`);
    }
	return new Response("API Error");
};
