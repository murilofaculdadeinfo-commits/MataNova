import { entrar } from "../api.js";
import { mostrarMensagem, esconderMensagem } from "../ui.js";

export function telaLogin(app, aoEntrar) {
  app.innerHTML = `
    <div class="login">
      <h1>MataNova</h1>
      <form id="form-login" class="cartao">
        <label>
          E-mail
          <input name="email" type="email" required autocomplete="username" />
        </label>
        <label>
          Senha
          <input name="senha" type="password" required autocomplete="current-password" />
        </label>
        <p id="msg-login" class="mensagem" role="status" hidden></p>
        <button type="submit">Entrar</button>
      </form>
    </div>
  `;

  const form = app.querySelector("#form-login");
  const msg = app.querySelector("#msg-login");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const email = form.elements.email.value;
    const senha = form.elements.senha.value;
    esconderMensagem(msg);
    try {
      const usuario = await entrar(email, senha);
      aoEntrar(usuario);
    } catch (erro) {
      mostrarMensagem(msg, erro.message, "erro");
    }
  });
}
