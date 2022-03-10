import MainSlider from "module/main/component/core/MainSlider";
import { fireEvent, render } from "test-utils";
import { translate } from "locale";
import { Alert } from "react-native";
import * as Recoil from "recoil";
import { cells } from "../../../wallet/mock/cells";


describe("Test for the Main Slider", () => {
    test("Renders correctly without accounts", () => {
        jest.spyOn(Alert, "alert");
        const screen = render(<MainSlider />);
        const button = screen.getByText(translate("add_an_account"));
        expect(button).toBeDefined();
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith("Add account");
    });
    test("Renders correctly with cells", () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ hasWallet: true, isAuthenticated: true, name: "wallet", cells: cells});
        const screen = render(<MainSlider />);
        expect(screen.getAllByText(translate("my_account"))).toHaveLength(3);
    })
});
