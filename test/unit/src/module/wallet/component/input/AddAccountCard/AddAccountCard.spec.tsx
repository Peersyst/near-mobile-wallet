import { translate } from "locale";
import AddAccountCard from "module/wallet/component/input/AddAccountCard/AddAccountCard";
import { fireEvent, render } from "test-utils";
import { Alert } from "react-native";

describe("Test for the AddAccountCard", () => {
    test("Renders correctly", () => {
        jest.spyOn(Alert, "alert");
        const screen = render(<AddAccountCard />);
        expect(screen.getByTestId("PlusIcon")).toBeDefined();
        const button = screen.getByText(translate("add_an_account"));
        expect(button).toBeDefined();
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith("Add account");
    });
});
