import { FailApiCall, render, SuccessApiCall } from "test-utils";
import HomePage from "module/main/page/HomePage/HomePage";
import { translate } from "locale";
import * as Login from "module/auth/utils/loginCall";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { RecoilState, useRecoilState } from "recoil";
import * as Recoil from "recoil";

describe("HomePage tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<HomePage />);
        expect(screen.getByText(translate("name")));
        expect(screen.getByText("Log in"));
        expect(screen.getByTestId("ArrowIcon")).toBeDefined();
    });

    test("Log in succeeds", async () => {
        jest.spyOn(Login, "loginCall").mockImplementation(() => SuccessApiCall({ auth_token: "test_token" }));

        const screen = render(<HomePage />);
        const button = screen.getByText("Log in");
        fireEvent.press(button);
        await waitFor(() => expect(screen.getByText("Log out")));
    });

    test("Log in fails", async () => {
        jest.spyOn(Login, "loginCall").mockImplementation(() => FailApiCall({ code: 403, message: "Invalid credentials" }));

        const screen = render(<HomePage />);
        const button = screen.getByText("Log in");
        fireEvent.press(button);
        await waitFor(() => expect(screen.getByText(JSON.stringify({ code: 403, message: "Invalid credentials" }))));
    });

    test("Log out", async () => {
        const setAuthState = jest.fn();

        jest.spyOn(Recoil, "useRecoilState").mockImplementation((atom: RecoilState<unknown>) => {
            if (atom.key === "authState") {
                return [{ token: "auth_token", isLogged: true }, setAuthState];
            } else {
                return useRecoilState(atom);
            }
        });

        const screen = render(<HomePage />);
        const button = screen.getByText("Log out");
        fireEvent.press(button);
        await waitFor(() => expect(setAuthState).toHaveBeenCalledWith({ token: undefined, isLogged: false }));
    });
});
