import { createContext, ReactNode, SetStateAction, useState } from "react";
interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  accessToken: string;
  setAccessToken: React.Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  setAccessToken: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
