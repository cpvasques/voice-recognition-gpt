const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.chatWithGPT = async (prompt) => {
  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003", //modelo de rede neural
      prompt, //input
      max_tokens: 1000, //max de palavras
      n: 1, //numero de respostas
      stop: null, //se null, parar quando atiginr o max de tokens
      temperature: 0.5, //valor maior + aleatorio, valor menor + conservador. 0.5 é o meio termo perfeito
    });
    const chatResponse = completion.data.choices[0].text.trim();
    return chatResponse;
  } catch (error) {
    console.error("Error while chatting with GPT:", error);
    return "Desculpe, ocorreu um erro ao processar sua mensagem.";
  }
};
