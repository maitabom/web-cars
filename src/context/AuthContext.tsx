import { createContext, useEffect, useState } from "react";
import AuthContextData from "./data/auth";
import AuthProviderProps from "./providers/auth";
import { onAuthStateChanged } from "firebase/auth";

import User from "../models/user";
import { auth } from "../services/firebase";

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }

      setLoadingAuth(false);

      return () => {
        unsub();
      };
    });
  });

  function handleInfoUser(user: User) {
    setUser({
      name: user.name,
      email: user.email,
      uid: user.uid,
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loadingAuth, handleInfoUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
