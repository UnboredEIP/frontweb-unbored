import { createContext } from "react";

export interface UpdateProfileData {
  username: string;
  gender: string;
}

export const ContextUpdateProfile = createContext<
  UpdateProfileData | undefined
>(undefined);
