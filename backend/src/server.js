const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { config } = require("./config");
const { router: triageRoutes } = require("./triageRoutes");

const app = express();

const corsOptions =
  config.frontendOrigin === "*"
    ? undefined
    : {
        origin: config.frontendOrigin,
      };

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", triageRoutes);

app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}`);
});
