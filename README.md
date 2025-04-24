# Deploy Next.js apps to Cloudflare

[OpenNext for Cloudflare](https://opennext.js.org/cloudflare) is an adapter that enables the deployment of Next.js applications to Cloudflare's developer platform.

This monorepo includes a package for adapting a Next.js application built via `next build` (in standalone mode) to run in the Cloudflare workerd runtime using the [Workers Node.js compatibility layer](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

## Get started

Visit the [OpenNext docs](https://opennext.js.org/cloudflare/get-started) for instructions on starting a new project, or migrating an existing one.

## Contributing

### The repository

The repository contains two directories:

- `packages` containing a cloudflare package that can be used to build a Cloudflare Workers-compatible output for Next.js applications.
- `examples` containing Next.js applications that use the above mentioned cloudflare package.

### How to try out the `@opennextjs/cloudflare` package

You can simply install the package from npm as specified in the [OpenNext documentation](https://opennext.js.org/cloudflare/get-started).

#### Preleases

Besides the standard npm releases we also automatically publish prerelease packages on branch pushes (using [`pkg.pr.new`](https://github.com/stackblitz-labs/pkg.pr.new)):

- `https://pkg.pr.new/@opennextjs/cloudflare@main`:
  Updated with every push to the `main` branch, this prerelease contains the most up to date yet (reasonably) stable version of the package.
- `https://pkg.pr.new/@opennextjs/cloudflare@experimental`
  Updated with every push to the `experimental` branch, this prerelease contains the latest experimental version of the package (containing features that we want to test/experiment on before committing to).

Which you can simply install directly with your package manager of choice, for example:

```bash
npm i https://pkg.pr.new/@opennextjs/cloudflare@main
```

### How to develop in the repository

See the [CONTRIBUTING](./CONTRIBUTING.md) page for how to get started with this repository.

## Deploying vercel/ai-chat on Cloudflare Workers

This repository includes an example of running `vercel/ai-chat` on Cloudflare Workers. Follow the steps below to set up and configure the worker.

### Steps to set up and configure the worker

1. **Create the directory**: Create a new directory `examples/vercel-ai-chat` to demonstrate running `vercel/ai-chat` on Cloudflare Workers.

2. **Add worker file**: Add a new worker file `examples/vercel-ai-chat/worker.ts` to handle requests for `vercel/ai-chat`.

3. **Add package.json**: Add a new `package.json` file in `examples/vercel-ai-chat` to manage dependencies for `vercel/ai-chat`.

4. **Add wrangler.jsonc**: Add a new `wrangler.jsonc` file in `examples/vercel-ai-chat` to configure the worker for `vercel/ai-chat`.

5. **Add worker-configuration.d.ts**: Add a new `worker-configuration.d.ts` file in `examples/vercel-ai-chat` to define Cloudflare environment variables.

6. **Update cloudflare-context.ts**: Update `packages/cloudflare/src/api/cloudflare-context.ts` to include necessary environment variables for `vercel/ai-chat`.

7. **Update worker.ts template**: Update `packages/cloudflare/src/cli/templates/worker.ts` to handle requests for `vercel/ai-chat`.

8. **Deploy the worker**: Use the provided scripts in `package.json` to build and preview the worker.

9. **Serve endpoints**: Implement logic to serve endpoints for `OpenApiSpec.json` and `README.md` content.

10. **Authorize by API_KEY**: Create an endpoint that authorizes by `API_KEY` so that the agent can also be utilized by other services.

11. **Bind instances**: Bind vectorization, durable chat, kv, r2, and d1 instances.

12. **Documentation**: Refer to this README for guidance on deploying `vercel/ai-chat` using this framework.
