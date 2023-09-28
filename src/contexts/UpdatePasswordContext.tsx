import { createContext } from "react";

export interface UpdatePasswordData {
  password: string;
}

export const ContextUpdatePassword = createContext<
  UpdatePasswordData | undefined
>(undefined);
