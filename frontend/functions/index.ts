export interface Env {
  KV: KVNamespace
}

export const onRequest: PagesFunction<Env> = async function( { request, env, next } ) {
    if (request.headers.get("user-agent")?.includes("Discordbot")) {
      const data: any = await env.KV.get("data", "json");
      const working = data?.end != null;

      const response = `<html><head>
      <meta name="og:title" content="Is DJ's Power Working Yet?">
      <meta name="og:description" content="${working ? "Yes" : "No"}. (open site for a non-cached answer)">
      </head></html>`;

      return new Response(response, {
        headers: {
          "content-type": "text/html"
        }
      });
    }

    return next();
  }
  