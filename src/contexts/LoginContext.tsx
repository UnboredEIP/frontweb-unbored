import { createContext } from "react";

export interface LoginData {
  email: string;
  password: string;
}

export const ContextLogin = createContext<LoginData | undefined>(undefined);
