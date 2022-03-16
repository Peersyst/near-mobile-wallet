import AccountCardHeader from "module/wallet/component/core/AccountCard/AccountCardHeader/AccountCardHeader";
import { fireEvent, render } from "test-utils";
import * as Clipboard from "expo-clipboard";

describe("Test for the AccountCardHeader component", () => {
    test("Renders correctly", () => {
        const screen = render(<AccountCardHeader name="my_account" address={"ck809"} />);
        expect(screen.getByText("my_account")).toBeDefined();
        expect(screen.getByTestId("StarIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();
    });

    test("Copies correctly", () => {
        jest.spyOn(Clipboard, "setString");
        const screen = render(<AccountCardHeader name="my_account" address={"ck809"} />);
        const icon = screen.getByTestId("CopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith("ck809");
    });
});
