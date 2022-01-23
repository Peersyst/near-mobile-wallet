import { useMutation, UseMutationResult } from "react-query";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { useSetRecoilState } from "recoil";
import { authState } from "module/auth/AuthState";
import { loginCall, LoginResponse, LoginRequest } from "module/auth/utils/loginCall";

export const useLogin = (): UseMutationResult<LoginResponse, unknown, LoginRequest> => {
    const setAuthState = useSetRecoilState(authState);

    return useMutation(loginCall, {
        onSuccess: async ({ auth_token }) => {
            setAuthState({ token: auth_token, isLogged: true });
            await AuthTokenStorage.set(auth_token);
        },
    });
};
