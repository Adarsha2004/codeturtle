// This function uses the e2b sandbox to safely clone the repo and fetch context from changed files

export async function getCodeContext(sandbox: any, repoUrl: string, branch: string, files: string[]) {
  // Clone the repository inside the sandbox (so you never run untrusted code locally!)
  await sandbox.run(`git clone -b ${branch} ${repoUrl} repo`);
  let context = "";

  // For each (up to 3) changed files, fetch the first 100 lines for LLM context
  for (const file of files.slice(0, 3)) {
    const result = await sandbox.run(`head -100 repo/${file}`);
    context += `\n---\n${file}:\n${result.stdout}`;
  }
  return context;
}
