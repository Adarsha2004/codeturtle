import dotenv from "dotenv";
dotenv.config();

import { Octokit } from "@octokit/rest";

// Prepare Octokit client
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Function to check if authentication is working
async function checkGithubAuth() {
  try {
    const { data } = await octokit.rest.users.getAuthenticated();
    console.log("✅ GitHub authentication works! Logged in as:", data.login);
  } catch (err) {
    console.error("❌ Authentication failed. Reason:");
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    // Also print environment variable status (do NOT print the token itself)
    if (!process.env.GITHUB_TOKEN) {
      console.error("GITHUB_TOKEN is missing from your .env file.");
    } else {
      console.error("GITHUB_TOKEN present, but may be invalid or lack permissions.");
    }
  }
}

checkGithubAuth();
