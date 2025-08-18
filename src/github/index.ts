// src/github/index.ts

import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create an Octokit instance authenticated as your GitHub App's installation
const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.GITHUB_APP_ID!,
    privateKey: process.env.GITHUB_PRIVATE_KEY!,
    installationId: Number(process.env.GITHUB_INSTALLATION_ID!),
  },
});

// Get PR diff as string
export async function getPRDiff(owner: string, repo: string, pr: number) {
  const { data } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: pr,
    mediaType: { format: "diff" },
  });
  return data as unknown as string;
}

// Get changed files in PR
export async function getPRFiles(owner: string, repo: string, pr: number) {
  const { data } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: pr,
  });
  return data.map((f) => f.filename);
}

// Post a comment on a PR (as the GitHub App)
export async function postPRComment(
  owner: string,
  repo: string,
  pr: number,
  body: string
) {
  try {
    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pr,
      body,
    });
    console.log("✅ Comment posted as CodeTurtle App:", response.data.html_url);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error posting comment as app:", error.message);
    throw error;
  }
}
