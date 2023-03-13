import { createContext, useEffect, useState } from "react";
type AuthProviderProps = {
  children: React.ReactNode;
};
type userInfoType =
  | {
      accessToken: string;
      id: string;
      isAdmin: boolean;
      username: string;
    }
  | undefined;
export type MyContextValue = {
  userInfo: userInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoType>>;
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
