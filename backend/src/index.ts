export interface Env {
  KV: KVNamespace
  TOKEN: string
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {

    const url = new URL(request.url);
    
    if (url.pathname == "/") {
      const data = await env.KV.get("data", "json");

      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } else if (url.pathname.includes(env.TOKEN)) {
      const data: any = await env.KV.get("data", "json");
      data.end = Date.now();
      await env.KV.put("data", JSON.stringify(data));

      return new Response("OK");
    }

    return Response.redirect("https://github.com/DJtheRedstoner");
  },
};
