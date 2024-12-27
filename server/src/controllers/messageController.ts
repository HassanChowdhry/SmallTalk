import express from "express";

const router = express.Router();

router.get("/:conversationId", (req, res) => {
  const conversationId = req.params.conversationId;
  console.log("GET /messages/:conversationId");
});

router.post("/:conversationId", (req, res) => {
  res.send("Hello World!");
});

export default router;