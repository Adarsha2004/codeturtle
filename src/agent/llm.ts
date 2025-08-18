import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

export async function reviewPRWithContext(diff: string, codeContext: string) {
  const prompt = `
You're an expert code reviewer.
Here is the code context:
${codeContext}

Here is the PR diff:
${diff}

List potential issues, improvements, risks. Suggest further tests or reviews. Markdown output.
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1
  });

  return completion.choices[0]?.message?.content || "";
}
