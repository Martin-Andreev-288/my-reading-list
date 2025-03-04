import { createContext, useReducer, useEffect, Dispatch } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

// Define the shape of your authentication state
interface AuthState {
  user: User | null;
  authIsReady: boolean;
}

// Define action types using a discriminated union
type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_IS_READY"; payload: User | null };

// Define the context type that includes the state and dispatch function
interface AuthContextProps extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// Initialize the context with an appropriate default value (or undefined if you prefer to check in your consumer)
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

// Type the reducer function
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
