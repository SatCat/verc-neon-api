//
//                  api_get_all_batch_ts
//

import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"; 
type Sql = ReturnType<typeof postgres>;

const VERC_NEON_DB_URL = Deno.env.get("VERC_NEON_DB_URL")

function simplifyDateFormat(items) {
    return items.map(item => {
      const dateStr = new Date(item.batch_ts).toISOString();
      const formatted = dateStr
        .replace(/\.\d{3}Z$/, 'Z')
        .replace('Z', '+00:00');
  
      return {
        batch: formatted,
        count: item.count
      };
    });
  }

export default async (req: Request) => {
    if (req.method === "POST") {
        const sql: Sql = postgres(VERC_NEON_DB_URL);
        const get_all_batch_ts = await sql`SELECT batch_ts::TEXT, count(*)::INTEGER FROM public.all_options GROUP BY batch_ts ORDER BY batch_ts ASC;`;
        const retval = JSON.stringify(get_all_batch_ts)
        await sql.close();
        return new Response(retval);
    }
	return new Response("API Error");
};
