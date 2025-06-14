//
//                  api_delele_opt_interval
//

import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"; 
type Sql = ReturnType<typeof postgres>;
interface Datas_from_to {
    batch_from: string;
    batch_to: string;
  }

const VERC_NEON_DB_URL = Deno.env.get("VERC_NEON_DB_URL");
const VERC_API_KEY = Deno.env.get("VERC_API_KEY");

export default async (req: Request) => {
    if (req.method === "POST" && req.headers.get('apikey') === VERC_API_KEY) {
        const {batch_from, batch_to} = await req.json() as Datas_from_to;

        const sql: Sql = postgres(VERC_NEON_DB_URL);
        await sql`DELETE FROM public.all_options WHERE batch_ts>=${batch_from+'+00:00'}::timestamptz AND batch_ts<=${batch_to+'+00:00'}::timestamptz;`;
        await sql`REINDEX TABLE public.all_options;`;
        await sql`VACUUM FULL;`;
        await sql.close();

        return new Response(null, { status: 204 });
    }

    return new Response("API Error", { status: 404 });
};
