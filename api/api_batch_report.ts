//
//              api_batch_report
//
import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"; 
type Sql = ReturnType<typeof postgres>;

const VERC_NEON_DB_URL = Deno.env.get("VERC_NEON_DB_URL")
const VERC_API_KEY = Deno.env.get("VERC_API_KEY");

export default async (req: Request) => {
    if (req.method === "POST" && req.headers.get('apikey') === VERC_API_KEY) {
        const sql: Sql = postgres(VERC_NEON_DB_URL);
        const retval = await sql`WITH fst AS (SELECT date(batch_ts) date, min(batch_ts) as start, max(batch_ts) as stop, count(1) as size_opt FROM public.all_options GROUP BY batch_ts)
            SELECT fst.date as date, count(1) as batches, min(fst.start) as start, max(fst.stop) as stop, sum(size_opt)::bigint as opt_total
            FROM fst GROUP BY date;`;
        await sql.close();
        return new Response(  JSON.stringify(retval)  );
    }
    return new Response("API Error");
};