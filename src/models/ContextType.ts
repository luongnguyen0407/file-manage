export type userInfoType =
  | {
      token: "QpwL5tke4Pnpja7X4";
    }
  | undefined;
export type MyContextValue = {
  userInfo: userInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoType>>;
};
