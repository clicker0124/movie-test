import React, { useReducer, createContext } from "react";
import { AuthUserInfo } from "../types";

const SESSION_DURATION = 1800000;

interface AuthState {
  user: AuthUserInfo | null;
}

export interface AuthContextType {
  context: AuthUserInfo | null;
  login: (userData: AuthUserInfo) => void;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
};

const userInfo = localStorage.getItem("userInfo");

if (userInfo) {
  const parsedUserInfo = JSON.parse(userInfo) as {
    token: string;
    tokenExpiry: number;
    userName: string;
    userEmail: string;
    userId: string;
    userRole: string;
  };
  if (parsedUserInfo.tokenExpiry >= Date.now() && initialState) {
    initialState.user = {
      token: parsedUserInfo.token,
      username: parsedUserInfo.userName,
      email: parsedUserInfo.userEmail,
      id: parsedUserInfo.userId,
      role: parsedUserInfo.userRole,
    };
  } else {
    localStorage.removeItem("userInfo");
  }
}

const AuthContext = createContext<AuthContextType>({
  context: null,
  login: () => {},
  logout: () => {},
});

function authReducer(state: AuthState, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: AuthUserInfo) => {
    const userInfo: string = JSON.stringify({
      userId: userData.id,
      userName: userData.username,
      userEmail: userData.email,
      userRole: userData.role,
      token: userData.token,
      tokenExpiry: Date.now() + SESSION_DURATION,
    });
    localStorage.setItem("userInfo", userInfo);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem("userInfo");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{ context: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
