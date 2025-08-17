import { Sandbox } from "@e2b/code-interpreter";

async function listRunningSandboxes() {
    const runningSandboxes = await Sandbox.list();
    if (runningSandboxes.length === 0) {
        console.log("No running sandboxes found");
    } else {
        runningSandboxes.forEach(sandbox => {
            console.log(`Sandbox ID: ${sandbox.sandboxId}, Template: ${sandbox.templateId}`);
        });
    }
}

listRunningSandboxes();