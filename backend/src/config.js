const config = {
  port: Number(process.env.PORT) || 4000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  frontendOrigin: process.env.FRONTEND_ORIGIN || "*",
};

module.exports = { config };
