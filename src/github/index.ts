import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getPRDiff(owner: string, repo: string, pr: number) {
  const { data } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: pr,
    mediaType: { format: "diff" }
  });
  return data as unknown as string;
}

export async function getPRFiles(owner: string, repo: string, pr: number) {
  const { data } = await octokit.pulls.listFiles({ owner, repo, pull_number: pr });
  return data.map((f) => f.filename);
}

export async function postPRComment(owner: string, repo: string, pr: number, body: string) {
  return octokit.issues.createComment({
    owner, repo, issue_number: pr, body
  });
}
