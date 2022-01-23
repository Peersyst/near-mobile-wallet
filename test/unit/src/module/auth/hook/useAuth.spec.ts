import { useAuth } from "module/auth/hook/useAuth";
import { renderHook } from "test-utils";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { act } from "@testing-library/react-hooks";

describe("useAuth tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Returns state", () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.state).toEqual({ token: undefined, isLogged: false });
    });

    test("Logs out", async () => {
        jest.spyOn(AuthTokenStorage, "clear").mockImplementation(jest.fn());

        const { result } = renderHook(() => useAuth());
        await act(async () => await result.current.logout());
        expect(AuthTokenStorage.clear).toHaveBeenCalled();
    });
});
