import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { UsuarioResponseDTO } from "../api";

type AuthContextType = {
  user: any;
  expireAt: Date | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (userData: any, token: string, expiresAt: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [expireAt, setExpireAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializa a sessão do usuário a partir do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedExpire = localStorage.getItem("expiresAt");

    console.log(storedToken);

    if (storedUser && storedToken && storedExpire) {
      const expires = new Date(parseInt(storedExpire));

      if (expires > new Date()) {
        setUser(JSON.parse(storedUser));
        setExpireAt(expires);

        // Timer para expiração automática
        const timeout = setTimeout(() => {
          signOut();
        }, expires.getTime() - new Date().getTime());

        setLoading(false);
        return () => clearTimeout(timeout);
      } else {
        // Expirou
        signOut();
      }
    }

    setLoading(false);
  }, []);

  // Função de logout
  const signOut = async () => {
    setUser(null);
    setExpireAt(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  };

  // Função para salvar sessão ao logar
  const signIn = (
    userData: UsuarioResponseDTO,
    token: string,
    expiresAt: string,
  ) => {
    const expires = new Date(expiresAt); // timestamp vindo do backend
    setUser(userData);
    setExpireAt(expires);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expires.getTime().toString());

    // Timer para expiração automática
    setTimeout(() => {
      signOut();
    }, expires.getTime() - new Date().getTime());
  };

  return (
    <AuthContext.Provider value={{ user, expireAt, loading, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
