const btn = document.getElementById("btn");
const loader = document.getElementById("loader");

let pressed = false;
let holdingBtn;
let recognition;

//Evento para verificar se o botão do mouse está pressionado
btn.addEventListener("mousedown", () => {
  pressed = true;

  holdingBtn = setTimeout(() => {
    if (pressed) {
      getMicText();
      loader.style.display = "flex";
    }
  }, 100); // tempo em milissegundos para chamar o método após segurar o botão
});

//Evento para verificar se soltou o botão do mouse
btn.addEventListener("mouseup", () => {
  pressed = false;
  loader.style.display = "none";
  clearTimeout(holdingBtn);
  stopMicText();
});

function getMicText() {
  recognition = new window.webkitSpeechRecognition();
  recognition.lang = "pt-BR";

  recognition.onresult = async (event) => {
    const text = event.results[0][0].transcript;
    console.log("Texto reconhecido:", text);
    await sendTextToServer(text);
  };

  recognition.start();
}

function stopMicText() {
  recognition.stop();
}

//Função para enviar o texto reconhecido ao servidor e exibir a resposta do ChatGPT
async function sendTextToServer(text) {
  const responseElement = document.getElementById("response");
  try {
    const chatReq = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const res = await chatReq.json();
    const { response } = res;

    writeResponseOnCard(response);
  } catch (error) {
    console.error("Erro ao enviar o texto para o servidor:", error);
    responseElement.textContent = "Ocorreu um erro ao processar sua mensagem.";
  }
}

function writeResponseOnCard(response) {
  const responseElement = document.getElementById("response");

  /* Para criar a animação de digitação, envolvemos o conteúdo do elemento com uma nova div que possui a classe 'typewriter' e definimos o conteúdo como uma string vazia. Em seguida, adicionamos o texto da resposta letra por letra, com um pequeno atraso entre cada letra. */
  let html = "";

  for (let i = 0; i < response.length; i++) {
    const delay = i * 20; // Define um atraso crescente com base no índice da letra
    html += `<span style="animation-delay: ${delay}ms;">${response.charAt(
      i
    )}</span>`;
  }

  responseElement.innerHTML = `<div class="typewriter">${html}</div>`;

  const cardElement = document.querySelector(".card-variant");

  // Ajusta a altura do card de acordo com o tamanho do texto
  const height = responseElement.offsetHeight;
  cardElement.style.height = `${height}px`;

  // Exibe o texto após ajustar a altura
  const typewriterElement = responseElement.querySelector(".typewriter");
  typewriterElement.style.visibility = "visible";

  // Adiciona um evento de animationend à animação de digitação
  typewriterElement.addEventListener("animationend", () => {
    // Atualiza a altura do card com animação suave
    cardElement.style.height = `${responseElement.offsetHeight}px`;
  });
}
