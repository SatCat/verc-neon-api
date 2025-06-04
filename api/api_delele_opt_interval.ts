//
//                  api_delele_opt_interval
//

import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"; 
type Sql = ReturnType<typeof postgres>;

const VERC_NEON_DB_URL = Deno.env.get("VERC_NEON_DB_URL");

export default async (req: Request) => {
    return new Response(JSON.stringify(req));
    /*
    if (req.method === "POST") {

        return new Response(JSON.stringify(req));


        
        const sql: Sql = postgres(VERC_NEON_DB_URL);
        const retval = await sql`SELECT CONCAT(TO_CHAR(batch_ts, 'YYYY-MM-DD'), 'T', TO_CHAR(batch_ts, 'HH24:MI:SS+00:00')) as batch, count(*)::INTEGER FROM public.all_options GROUP BY batch_ts ORDER BY batch_ts ASC;`;
        await sql.close();
        return new Response(  JSON.stringify(retval)  );
        
    }

    return new Response("API Error");
    */
};
