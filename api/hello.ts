const VER = "0.0.1";

export default (req: Request) => {
	const headers = JSON.stringify(req.headers);
	return new Response(`Headers: ${headers}<br>Method: ${req.method}<br>Url:$(req.url)`);
};
