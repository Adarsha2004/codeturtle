import express from "express";
import dotenv from "dotenv";
import { webhookRouter } from "./src/routes/webhook.js";

dotenv.config();

const app = express();
app.use(express.json());

// Mount webhook routes
app.use("/webhook", webhookRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
