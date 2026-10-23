import { BrowserRouter, HashRouter } from "react-router-dom";
import { SessaoProvider } from "./hooks/useSessao";
import { AppRoutes } from "./routes/AppRoutes";
import { Moldura } from "./components/Moldura";

// HashRouter quando o app é servido de um endereço sem reescrita de rotas (prévia estática).
const Roteador = import.meta.env.VITE_HASH_ROUTER === "true" ? HashRouter : BrowserRouter;

export function App() {
  return (
    <SessaoProvider>
      <Roteador future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Moldura>
          <AppRoutes />
        </Moldura>
      </Roteador>
    </SessaoProvider>
  );
}
