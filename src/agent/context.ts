export async function getCodeContext(sandbox: any, repoUrl: string, branch: string, files: string[]) {
  // Clone the repository in the sandbox
  await sandbox.commands.run(`git clone -b ${branch} ${repoUrl} repo`);
  let context = '';
  for (const file of files.slice(0, 3)) {
    const res = await sandbox.commands.run(`head -100 repo/${file}`);
    context += `\n---\n${file}:\n${res.stdout}`;
  }
  return context;
}
// Use sandbox.commands.run() instead of sandbox.run()
