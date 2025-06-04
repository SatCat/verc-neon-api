//
//                  api_get_all_batch_ts
//

import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"; 
type Sql = ReturnType<typeof postgres>;

const VERC_NEON_DB_URL = Deno.env.get("VERC_NEON_DB_URL")

export default async (req: Request) => {
    if (req.method === "POST") {
        const sql: Sql = postgres(VERC_NEON_DB_URL);
        const get_all_batch_ts = JSON.stringify(await sql`SELECT batch_ts, count(*) FROM public.all_options GROUP BY batch_ts ORDER BY batch_ts ASC;`);

        await sql.close();
        return new Response(get_all_batch_ts);
    }
	return new Response("API Error");
};
