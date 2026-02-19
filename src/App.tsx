import { BrowserRouter } from "react-router";
import "./config/api";
import { AuthProvider, ThemeProvider } from "./context";
import { ApplyTheme, AppRoutes } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ApplyTheme>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ApplyTheme>
      </AuthProvider>
    </ThemeProvider>
  );
}
