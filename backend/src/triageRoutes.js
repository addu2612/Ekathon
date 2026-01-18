const express = require("express");
const { SYSTEM_PROMPT, buildUserPrompt } = require("./prompts");
const { callGemini } = require("./geminiClient");
const { config } = require("./config");

const router = express.Router();

router.post("/triage", async (req, res) => {
  try {
    const { text, followUp } = req.body ?? {};
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }

    const prompt = buildUserPrompt(text, followUp);
    const result = await callGemini({
      apiKey: config.geminiApiKey,
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: prompt,
    });

    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to process" });
  }
});

module.exports = { router };
