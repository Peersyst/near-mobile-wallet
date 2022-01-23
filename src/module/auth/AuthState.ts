import { atom } from "recoil";

export interface AuthState {
    token: string | undefined;
    isLogged: boolean;
}

export const authState = atom<AuthState>({
    key: "authState",
    default: { token: undefined, isLogged: false },
});
