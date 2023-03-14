export type userInfoType =
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
