export async function getCodeContext(sandbox: any, repoUrl: string, branch: string, files: string[]) {
  // Add GitHub token for authentication
  const authenticatedUrl = repoUrl.replace('https://github.com/', `https://${process.env.GITHUB_TOKEN}@github.com/`);

  await sandbox.commands.run(`git clone -b ${branch} ${authenticatedUrl} repo`);
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



