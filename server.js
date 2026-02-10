const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "64kb" }));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Email sanitizer endpoint
app.post("/v1/sanitize-email", (req, res) => {

  const { input } = req.body;

  if (typeof input !== "string") {
    return res.status(400).json({
      error: "Input must be a string."
    });
  }

  const output = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9@._+\-]/g, "");

  return res.status(200).json({
    output: output
  });

});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    error: "Not found"
  });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
