import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

// Create an Octokit instance authenticated as your app's installation
const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
        appId: process.env.GITHUB_APP_ID!,
        // Required for multi-line env var secrets
        privateKey: process.env.GITHUB_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        installationId: Number(process.env.GITHUB_INSTALLATION_ID!),
    },
});

// Example: Function to post a comment on a PR as the GitHub App
export async function postPRComment(
    owner: string,
    repo: string,
    issue_number: number,
    body: string
) {
    try {
        const response = await octokit.issues.createComment({
            owner,
            repo,
            issue_number,
            body,
        });
        console.log("Comment posted successfully:", response.data.html_url);
    } catch (error) {
        console.error("Error posting comment:", error);
    }
}

// --- Usage Example ---
// postPRComment("YOUR_GITHUB_USERNAME", "YOUR_REPO_NAME", 1, "Hello from CodeTurtle bot!");
