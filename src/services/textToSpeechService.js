const say = require("say");

exports.textToSpeech = (text, voice = "Alex", speed = 1.0) => {
  say.speak(text, voice, speed);
};
