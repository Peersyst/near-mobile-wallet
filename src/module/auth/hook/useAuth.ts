import { authState, AuthState } from "module/auth/AuthState";
import { useRecoilState } from "recoil";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";

export interface UseAuthResult {
    state: AuthState;
    logout: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
    const [state, setState] = useRecoilState(authState);
    const logout = async (): Promise<void> => {
        await AuthTokenStorage.clear();
        setState({ token: undefined, isLogged: false });
    };
    return { state, logout };
}
