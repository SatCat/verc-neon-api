const VER = "0.0.1";

export default (req: Request) => {
	return new Response(`Hello, from Deno v${Deno.version.deno}!   app ver.${VER}`);
};
