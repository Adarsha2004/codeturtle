import { Router } from "express";
import { handleGithubWebhook } from "../agent/index";

export const webhookRouter = Router();

webhookRouter.post("/github", async (req, res) => {
  try {
    const result = await handleGithubWebhook(req.body);
    res.json({ ok: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: (err as any).message });
  }
});
