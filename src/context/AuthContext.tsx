import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { getCurrentUser } from "@/src/lib/appwrite";
import { useAppwrite } from "../lib/useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}
interface AuthContextType {
  isLogged: boolean;
  data: User | null;
  loading: boolean;
  checkLoggedInUser: () => void;
  error: string;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLogged = !!user;
  return (
    <AuthContext.Provider value={{ user, isLogged, loading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};
