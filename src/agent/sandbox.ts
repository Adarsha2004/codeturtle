import { Sandbox } from "@e2b/code-interpreter";

export async function withSandbox<T>(fn: (sandbox: Sandbox) => Promise<T>) {
  const sandbox = await Sandbox.create({ apiKey: process.env.E2B_API_KEY! });
  try {
    return await fn(sandbox);
  } finally {
    await sandbox.kill();
  }
}
