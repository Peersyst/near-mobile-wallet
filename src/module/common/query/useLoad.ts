import { useSetRecoilState } from "recoil";
import { authState } from "module/auth/AuthState";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { useEffect, useState } from "react";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setAuthState = useSetRecoilState(authState);

    useEffect(() => {
        AuthTokenStorage.get().then(async (token) => {
            if (token) setAuthState({ token, isLogged: true });
            // OTHER STUFF
            setLoading(false);
        });
    }, [setAuthState]);

    return loading;
}
