const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

/** Modo demonstração: a API é simulada no navegador (src/demo/mockApi.ts), sem back-end. */
export const MODO_DEMO = import.meta.env.VITE_DEMO === "true";

const TOKEN_STORAGE_KEY = "fateclab.token";

/** Disparado quando a API recusa o token (expirado ou inválido); a sessão escuta e sai. */
export const EVENTO_SESSAO_EXPIRADA = "fateclab:sessao-expirada";

function lerArmazenamento(chave: string): string | null {
  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return lerArmazenamento(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // armazenamento indisponível (aba privada): a sessão vale só enquanto a página estiver aberta
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // sem armazenamento, nada a limpar
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
}

export interface RespostaBruta {
  status: number;
  corpo: unknown;
}

async function enviar(path: string, options: RequestOptions, token: string | null): Promise<RespostaBruta> {
  if (MODO_DEMO) {
    const { mockFetch } = await import("../demo/mockApi");
    return mockFetch(path, options.method ?? "GET", options.body, token);
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Sem conexão com o servidor. Verifique sua internet ou tente de novo em alguns segundos.",
      0,
    );
  }

  let corpo: unknown = undefined;
  if (response.status !== 204) {
    try {
      corpo = await response.json();
    } catch {
      corpo = undefined;
    }
  }
  return { status: response.status, corpo };
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth = true } = options;
  const token = auth ? getToken() : null;
  const { status, corpo } = await enviar(path, options, token);

  if (status < 200 || status >= 300) {
    if (status === 401 && auth && token) {
      window.dispatchEvent(new Event(EVENTO_SESSAO_EXPIRADA));
    }
    const mensagem =
      (corpo as { mensagem?: string } | undefined)?.mensagem ??
      (status === 401
        ? "Sua sessão expirou. Entre novamente."
        : status === 403
          ? "Você não tem permissão para isso."
          : `Erro ${status} ao chamar ${path}`);
    throw new ApiError(mensagem, status);
  }

  return corpo as T;
}

/** Acorda o servidor em hospedagens gratuitas que suspendem a aplicação ociosa. */
export function acordarServidor(): void {
  if (MODO_DEMO) return;
  fetch(`${API_BASE_URL}/saude`).catch(() => undefined);
}
