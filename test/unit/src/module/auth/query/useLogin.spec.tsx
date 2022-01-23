import { useLogin } from "module/auth/query/useLogin";
import * as Login from "module/auth/utils/loginCall";
import { useRecoilValue } from "recoil";
import { authState } from "module/auth/AuthState";
import { renderHook } from "test-utils";
import { act } from "@testing-library/react-hooks";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";

const renderUseLogin = () =>
    renderHook(() => {
        const login = useLogin();
        const { token, isLogged } = useRecoilValue(authState);
        return { login, token, isLogged };
    });

describe("useLogin tests", () => {
    const setAuthToken = jest.spyOn(AuthTokenStorage, "set").mockImplementation(jest.fn());

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Logins successfully", async () => {
        const loginCall = jest
            .spyOn(Login, "loginCall")
            .mockImplementation(() => new Promise((resolve) => resolve({ auth_token: "test_token" })));

        const { result } = renderUseLogin();
        await act(async () => {
            await result.current.login.mutate({ username: "test", password: "Test1234" });
        });
        expect(loginCall).toHaveBeenCalled();
        expect(result.current.token).toEqual("test_token");
        expect(result.current.isLogged).toEqual(true);
        expect(setAuthToken).toHaveBeenCalledWith("test_token");
    });

    test("Login fails", async () => {
        const loginCall = jest
            .spyOn(Login, "loginCall")
            .mockImplementation(() => new Promise((_resolve, reject) => reject({ code: 403, message: "Invalid credentials" })));

        const { result } = renderUseLogin();
        await act(async () => {
            await result.current.login.mutate({ username: "test", password: "Test1234" });
        });
        expect(loginCall).toHaveBeenCalled();
        expect(result.current.token).toBeUndefined();
        expect(result.current.isLogged).toEqual(false);
        expect(setAuthToken).not.toHaveBeenCalled();
    });
});
