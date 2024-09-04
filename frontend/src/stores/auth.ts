import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type UserProps = {
  email: string;
  id: string;
  role: string;
  fullName: string;
};

type TokenProps = {
  accessToken: string;
  refreshToken: string;
};

type AuthStore = {
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
  token: TokenProps | null;
  setToken: (token: TokenProps | null) => void;
};

export const useAuthStore = create<AuthStore>()(
  immer(
    persist(
      (set) => ({
        user: null,
        setUser: (user) =>
          set((state) => {
            state.user = user;
          }),
        token: null,
        setToken: (token) =>
          set((state) => {
            state.token = token;
          }),
      }),
      {
        name: "EasyGenerator-auth-store",
      }
    )
  )
);
