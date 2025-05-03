interface CloudflareEnv {
  API_KEY: string;
  VECTOR_STORE: string;
  DURABLE_CHAT: DurableObjectNamespace;
  KV_STORE: KVNamespace;
  R2_STORE: R2Bucket;
  D1_STORE: D1Database;
  OPEN_API_SPEC: string;
  README_CONTENT: string;
  HOMEASSISTANT_API_URL: string;
  HOMEASSISTANT_API_KEY: string;
}
