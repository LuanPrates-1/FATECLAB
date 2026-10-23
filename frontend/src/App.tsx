import { BrowserRouter } from "react-router-dom";
import { SessaoProvider } from "./hooks/useSessao";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <SessaoProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SessaoProvider>
  );
}
