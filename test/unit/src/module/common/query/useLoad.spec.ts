import { useLoad } from "module/common/query/useLoad";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { useRecoilValue } from "recoil";
import { authState } from "module/auth/AuthState";
import { renderHook, waitFor } from "test-utils";

const renderUseLoad = () =>
    renderHook(() => {
        const loading = useLoad();
        const { token, isLogged } = useRecoilValue(authState);
        return { loading, token, isLogged };
    });

describe("useLoad tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Loads without token", async () => {
        const getAuthToken = jest.spyOn(AuthTokenStorage, "get").mockImplementation(() => new Promise((resolve) => resolve(null)));

        const { result } = renderUseLoad();
        expect(result.current.loading).toBe(true);
        expect(getAuthToken).toHaveBeenCalled();
        await new Promise((r) => setTimeout(r, 3100));
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.token).toBeUndefined();
        expect(result.current.isLogged).toBe(false);
    });

    test("Loads with token", async () => {
        const getAuthToken = jest.spyOn(AuthTokenStorage, "get").mockImplementation(() => new Promise((resolve) => resolve("test_token")));

        const { result } = renderUseLoad();
        expect(result.current.loading).toBe(true);
        expect(getAuthToken).toHaveBeenCalled();
        await new Promise((r) => setTimeout(r, 3100));
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.isLogged).toBe(true);
        expect(result.current.token).toEqual("test_token");
    });
});
