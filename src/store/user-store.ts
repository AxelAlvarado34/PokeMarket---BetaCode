import { create } from "zustand";

export type UserRole = "admin" | "buyer";

export interface User {
    email: string;
    role: UserRole;
}

interface UserStore {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const USER_KEY = "poke_user";

export const useUserStore = create<UserStore>((set) => ({
    user: JSON.parse(localStorage.getItem(USER_KEY) || "null"),

    login: (user: User) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        set({ user });
    },

    logout: () => {
        localStorage.removeItem(USER_KEY);
        set({ user: null });
    }
}));
