const express = require("express");
const router = express.Router();

const { chatWithGPT } = require("../services/chatService");
const { textToSpeech } = require("../services/textToSpeechService");

router.post("/chat", async (req, res) => {
  const inputText = req.body.text;
  const prompt = `Usuário: ${inputText}\nChatGPT: `;
  const chatGPTResponse = await chatWithGPT(prompt);

  textToSpeech(chatGPTResponse);
  res.json({ response: chatGPTResponse });
});

module.exports = router;
