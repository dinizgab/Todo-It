import { createContext, ReactNode, SetStateAction, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  authToken: string;
  setAuthToken: React.Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType>({
    authToken: "",
    setAuthToken: () => {}
});

export function AuthProvider(props: AuthProviderProps) {
  const [authToken, setAuthToken] = useState("");

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}
