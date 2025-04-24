import { createAgent, createTool, createVectorStore, createDurableChat, createKVStore, createR2Store, createD1Store, createChatUI } from 'vercel/ai-chat';

export default {
  async fetch(request, env, ctx) {
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

    if (url.pathname === '/') {
      const chatUI = createChatUI();
      return new Response(chatUI, { status: 200, headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('Not Found', { status: 404 });
  },
};
