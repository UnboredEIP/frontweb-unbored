import { createContext } from "react";

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export const ContextRegister = createContext<RegisterData | undefined>(undefined);
