// routes/index.js
const express = require("express");
const { handleMessage, clearHistory } = require("../controllers/messageController");

const router = express.Router();

router.post("/message", handleMessage);
router.delete("/message", clearHistory);

module.exports = router;
