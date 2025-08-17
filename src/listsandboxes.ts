import { Sandbox } from "@e2b/code-interpreter";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function listRunningSandboxes() {
    try {
        const runningSandboxes = await Sandbox.list({ apiKey: process.env.E2B_API_KEY! });
        if (runningSandboxes.length === 0) {
            console.log("No running sandboxes found");
        } else {
            console.log(`Found ${runningSandboxes.length} sandbox(es):`);
            runningSandboxes.forEach((sandbox, index) => {
                console.log(`${index + 1}. Sandbox ID: ${sandbox.sandboxId}`);
                console.log(`   Template ID: ${sandbox.templateId}`);
                console.log('---');
            });
        }
    } catch (error) {
        console.error("Error listing sandboxes:", error);
    }
}

listRunningSandboxes();