import { createContext } from "react";

export interface UpdateEmailData {
  email: string;
}

export const ContextUpdateEmail = createContext<UpdateEmailData | undefined>(
  undefined
);
