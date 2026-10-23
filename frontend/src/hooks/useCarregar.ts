import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "../services/apiClient";

/** Carrega dados assíncronos com estados de carregamento e erro, ignorando respostas antigas. */
export function useCarregar<T>(buscar: () => Promise<T>, dependencias: unknown[], mensagemErro: string) {
  const [dados, setDados] = useState<T | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const chamada = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executar = useCallback(buscar, dependencias);

  const recarregar = useCallback(async () => {
    const minha = ++chamada.current;
    setCarregando(true);
    setErro(null);
    try {
      const resultado = await executar();
      if (minha === chamada.current) setDados(resultado);
    } catch (e) {
      if (minha === chamada.current) setErro(e instanceof ApiError ? e.message : mensagemErro);
    } finally {
      if (minha === chamada.current) setCarregando(false);
    }
  }, [executar, mensagemErro]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { dados, setDados, erro, carregando, recarregar };
}
