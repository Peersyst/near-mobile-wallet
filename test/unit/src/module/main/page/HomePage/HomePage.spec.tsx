import { render } from "test-utils";
import HomePage from "module/main/page/HomePage/HomePage";
import { translate } from "locale";
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
        expect(screen.getByText("Log out"));
        expect(screen.getByTestId("ArrowIcon")).toBeDefined();
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
