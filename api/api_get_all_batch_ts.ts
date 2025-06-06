//
//                  api_get_all_batch_ts
//

import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"; 
type Sql = ReturnType<typeof postgres>;

const VERC_NEON_DB_URL = Deno.env.get("VERC_NEON_DB_URL")
const VERC_API_KEY = Deno.env.get("VERC_API_KEY");

export default async (req: Request) => {
    if (req.method === "POST" && req.headers.get('apikey') === VERC_API_KEY) {
        const sql: Sql = postgres(VERC_NEON_DB_URL);
        const retval = await sql`SELECT public.TPZZ(batch_ts) as batch, count(*)::INTEGER FROM public.all_options GROUP BY batch_ts ORDER BY batch_ts ASC;`;
        await sql.close();
        return new Response(  JSON.stringify(retval)  );
    }
	return new Response("API Error");
};

/*
  В бд есть дву функции, которые выдают строки timestamptz в правильном формате (без ms и с ms)
--DROP FUNCTION public.TPZZ(timestamptz);
CREATE OR REPLACE FUNCTION public.TPZZ(d timestamptz)
RETURNS TEXT AS $$
BEGIN
  RETURN CONCAT(TO_CHAR(d, 'YYYY-MM-DD'), 'T', TO_CHAR(d, 'HH24:MI:SS+00:00'));
END;
$$ LANGUAGE plpgsql;

--DROP FUNCTION public.TPZZ_ms(timestamptz);
CREATE OR REPLACE FUNCTION public.TPZZ_ms(d timestamptz)
RETURNS TEXT AS $$
BEGIN
  RETURN CONCAT(TO_CHAR(d, 'YYYY-MM-DD'), 'T', TO_CHAR(d, 'HH24:MI:SS.MS+00:00'));
END;
$$ LANGUAGE plpgsql;
*/