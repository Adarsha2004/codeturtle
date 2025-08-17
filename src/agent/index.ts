import { getPRDiff, getPRFiles, postPRComment } from "../github/index.js";
import { withSandbox } from "./sandbox.js";
import { getCodeContext } from "./context.js";
import { reviewPRWithContext } from "./llm.js";

export async function handleGithubWebhook(body: any) {
  const { action, pull_request, repository } = body;
  if (!pull_request || (action !== "opened" && action !== "synchronize"))
    return { status: "ignored" };

  const owner = repository.owner.login;
  const repo = repository.name;
  const number = pull_request.number;

  const diff = await getPRDiff(owner, repo, number);
  const files = await getPRFiles(owner, repo, number);
  const repoUrl = `https://github.com/${owner}/${repo}.git`;

  const codeContext = await withSandbox(async (sandbox) => {
    return await getCodeContext(sandbox, repoUrl, pull_request.head.ref, files);
  });

  const review = await reviewPRWithContext(diff, codeContext);

  await postPRComment(
    owner,
    repo,
    number,
    `## 🤖 AI Code Review\n\n${review}`
  );

  return { status: "review-posted" };
}
