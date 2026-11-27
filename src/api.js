// Todas as chamadas à API passam por aqui
const CHAVE_TOKEN = "matanova_token";
const CHAVE_NOME = "matanova_usuario";

export function lerToken() {
  return localStorage.getItem(CHAVE_TOKEN);
}

export function lerNomeUsuario() {
  return localStorage.getItem(CHAVE_NOME);
}

export function sair() {
  localStorage.removeItem(CHAVE_TOKEN);
  localStorage.removeItem(CHAVE_NOME);
}

async function requisicao(caminho, opcoes = {}) {
  const headers = { "Content-Type": "application/json", ...opcoes.headers };
  const token = lerToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let resposta;
  try {
    resposta = await fetch(`/api${caminho}`, {
      ...opcoes,
      headers,
    });
  } catch {
    throw new Error("Sem conexão com o servidor. Verifique se o frontend está rodando.");
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new Error(
      dados?.erro ?? `A API não respondeu (erro ${resposta.status}). Ela está rodando?`,
    );
  }
  return dados;
}

export async function entrar(email, senha) {
  const dados = await requisicao("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
  localStorage.setItem(CHAVE_TOKEN, dados.token);
  localStorage.setItem(CHAVE_NOME, dados.usuario.nome);
  return dados.usuario;
}

// Doadores
export const listarDoadores = () => requisicao("/doadores");
export const criarDoador = (doador) =>
  requisicao("/doadores", { method: "POST", body: JSON.stringify(doador) });
export const atualizarDoador = (id, doador) =>
  requisicao(`/doadores/${id}`, { method: "PUT", body: JSON.stringify(doador) });
export const excluirDoador = (id) => requisicao(`/doadores/${id}`, { method: "DELETE" });

// Itens e doações
export const listarItens = () => requisicao("/itens");
export const listarDoacoes = () => requisicao("/doacoes");
export const registrarDoacao = (doacao) =>
  requisicao("/doacoes", { method: "POST", body: JSON.stringify(doacao) });

// Saúde
export const verificarSaude = () => requisicao("/health");
