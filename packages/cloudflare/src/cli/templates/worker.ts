import { runWithCloudflareRequestContext } from "./cloudflare/init.js";
import { createAgent, createTool, createVectorStore, createDurableChat, createKVStore, createR2Store, createD1Store } from 'vercel/ai-chat';

export { DOQueueHandler } from "./.build/durable-objects/queue.js";
export { DOShardedTagCache } from "./.build/durable-objects/sharded-tag-cache.js";

export default {
  async fetch(request, env, ctx) {
    return runWithCloudflareRequestContext(request, env, ctx, async () => {
      const url = new URL(request.url);

      if (url.pathname === '/api/agent') {
        const apiKey = request.headers.get('API_KEY');
        if (!apiKey || apiKey !== env.API_KEY) {
          return new Response('Unauthorized', { status: 401 });
        }

        const agent = createAgent({
          tools: [
            createTool('vectorization', createVectorStore(env.VECTOR_STORE)),
            createTool('durable-chat', createDurableChat(env.DURABLE_CHAT)),
            createTool('kv', createKVStore(env.KV_STORE)),
            createTool('r2', createR2Store(env.R2_STORE)),
            createTool('d1', createD1Store(env.D1_STORE)),
          ],
        });

        return new Response(JSON.stringify(agent), { status: 200 });
      }

      if (url.pathname === '/api/openapi') {
        return new Response(JSON.stringify(env.OPEN_API_SPEC), { status: 200 });
      }

      if (url.pathname === '/api/readme') {
        return new Response(env.README_CONTENT, { status: 200 });
      }

      // Serve images in development.
      if (url.pathname.startsWith("/cdn-cgi/image/")) {
        const m = url.pathname.match(/\/cdn-cgi\/image\/.+?\/(?<url>.+)$/);
        if (m === null) {
          return new Response("Not Found!", { status: 404 });
        }
        const imageUrl = m.groups!.url!;
        return imageUrl.match(/^https?:\/\//)
          ? fetch(imageUrl, { cf: { cacheEverything: true } })
          : env.ASSETS?.fetch(new URL(`/${imageUrl}`, url));
      }

      // Fallback for the Next default image loader.
      if (url.pathname === `${globalThis.__NEXT_BASE_PATH__}/_next/image`) {
        const imageUrl = url.searchParams.get("url") ?? "";
        return imageUrl.startsWith("/")
          ? env.ASSETS?.fetch(`http://assets.local${imageUrl}`)
          : fetch(imageUrl, { cf: { cacheEverything: true } });
      }

      const { handler } = await import("./server-functions/default/handler.mjs");

      return handler(request, env, ctx);
    });
  },
} satisfies ExportedHandler<CloudflareEnv>;
