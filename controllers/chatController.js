const chatService = require("../services/chatService");
const textToSpeechService = require("../services/textToSpeechService");

exports.chat = async (req, res) => {
  const inputText = req.body.text;
  const prompt = `Usuário: ${inputText}\nChatGPT: `;
  const chatGPTResponse = await chatService.chatWithGPT(prompt);
  textToSpeechService.textToSpeech(chatGPTResponse);
  res.json({ response: chatGPTResponse });
};
