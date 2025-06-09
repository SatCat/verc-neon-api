//
//              api_get_opt_interval
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
        //  input format!!:  { "batch_from": "2025-06-08 00:00:00+00:00",  "batch_to": "2025-06-08 00:55:00+00:00"}
        const {batch_from, batch_to} = await req.json() as Datas_from_to;
        console.log()
        const sql: Sql = postgres(VERC_NEON_DB_URL);
        const retval = await sql`SELECT instrument_name, option_type, strike, public.TPZZ(expiration_timestamp) expiration_timestamp, public.TPZZ(creation_timestamp) creation_timestamp,
            public.TPZZ_ms(timestamp) timestamp, index_price, underlying_index, underlying_price, underlying_price, open_interest, mark_price, best_ask_price, best_bid_price, mark_iv, delta, 
            vega, gamma, theta, rho, public.TPZZ(batch_ts) batch_ts FROM public.all_options
            WHERE batch_ts>=${batch_from}::timestamptz AND batch_ts<=${batch_to}::timestamptz
            ORDER BY batch_ts;`;
        await sql.close();

        return new Response(  JSON.stringify(retval)  );
    }

    return new Response("API Error", { status: 404 });
};
