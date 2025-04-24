import { createAgent, createTool, createVectorStore, createDurableChat, createKVStore, createR2Store, createD1Store, createChatUI } from 'vercel/ai-chat';

export function createAIBinding(env) {
  return createAgent({
    tools: [
      createTool('vectorization', createVectorStore(env.VECTOR_STORE)),
      createTool('durable-chat', createDurableChat(env.DURABLE_CHAT)),
      createTool('kv', createKVStore(env.KV_STORE)),
      createTool('r2', createR2Store(env.R2_STORE)),
      createTool('d1', createD1Store(env.D1_STORE)),
      createChatUI()
    ],
  });
}
