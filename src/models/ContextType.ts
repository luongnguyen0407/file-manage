export type userInfoType =
  | {
      token: string;
    }
  | undefined;
export type MyContextValue = {
  userInfo: userInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoType>>;
};
