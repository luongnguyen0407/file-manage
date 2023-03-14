import { createContext, useEffect, useState } from "react";
import { MyContextValue, userInfoType } from "../models/ContextType";
type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthContext = createContext<MyContextValue | null>(null);
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<userInfoType>();
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    //get user when reload page
    (async () => {})();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, AuthContext };
