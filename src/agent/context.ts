export async function getCodeContext(sandbox: any, repoUrl: string, branch: string, files: string[]) {
  await sandbox.commands.run(`git clone -b ${branch} ${repoUrl} repo`);
  let context = '';

  for (const file of files) {
    try {
      const res = await sandbox.commands.run(`head -100 repo/${file}`);
      context += `\n${file}:\n${res.stdout}`;
    } catch (error) {
      context += `\n${file}:\n[File could not be read: ${error}]`;
    }
  }
  return context;
}



