import MainSlider from "module/main/component/core/MainSlider";
import { fireEvent, render } from "test-utils";
import { translate } from "locale";
import { Alert } from "react-native";

describe("Test for the Main Slider", () => {
    test("Renders correctly without accounts", () => {
        jest.spyOn(Alert, "alert");
        const screen = render(<MainSlider />);
        const button = screen.getByText(translate("add_an_account"));
        expect(button).toBeDefined();
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith("Add account");
    });
});
