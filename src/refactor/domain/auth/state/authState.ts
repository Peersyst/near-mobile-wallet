import { createStore } from "zustand";

export interface IAuthState {
    isAuthenticated: boolean;
}

export const defaultAuthState: IAuthState = { isAuthenticated: false };

const authState = createStore<IAuthState>(() => defaultAuthState);

export default authState;
