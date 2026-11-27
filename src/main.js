import "./style.css";
import { verificarSaude, lerToken, lerNomeUsuario, sair } from "./api.js";
import { telaDoacoes, telaNovaDoacao } from "./pages/doacoes.js";
import { telaDoadores } from "./pages/doadores.js";
import { telaLogin } from "./pages/login.js";

const app = document.querySelector("#app");
const nav = document.querySelector("nav");
const marca = document.querySelector(".marca");

const rotas = {
  "#/doadores": telaDoadores,
  "#/doacoes/nova": telaNovaDoacao,
  "#/doacoes": telaDoacoes,
};

function atualizarMenu() {
  const logado = !!lerToken();
  nav.style.display = logado ? "" : "none";
  marca.style.display = logado ? "" : "none";

  // Botão Sair
  let botaoSair = document.querySelector("#botao-sair");
  if (logado && !botaoSair) {
    botaoSair = document.createElement("button");
    botaoSair.id = "botao-sair";
    botaoSair.className = "secundario";
    botaoSair.textContent = "Sair";
    botaoSair.style.marginLeft = "1rem";
    botaoSair.addEventListener("click", () => {
      sair();
      location.hash = "";
      navegar();
    });
    document.querySelector(".topo").append(botaoSair);
  } else if (!logado && botaoSair) {
    botaoSair.remove();
  }
}

function navegar() {
  atualizarMenu();

  if (!lerToken()) {
    telaLogin(app, () => {
      location.hash = "#/doadores";
      navegar();
    });
    return;
  }

  const rota = rotas[location.hash] ? location.hash : "#/doadores";
  for (const link of document.querySelectorAll("nav a")) {
    if (link.getAttribute("href") === rota) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  rotas[rota](app);
}

window.addEventListener("hashchange", navegar);
navegar();

// Indicador no rodapé
const statusApi = document.querySelector("#status-api");
verificarSaude()
  .then((saude) => (statusApi.textContent = `${saude.status}, banco: ${saude.banco}`))
  .catch(() => (statusApi.textContent = "fora do ar"));
