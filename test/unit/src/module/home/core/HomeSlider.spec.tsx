import HomeSlider from "module/home/component/core/HomeSlider";
import { fireEvent, render } from "test-utils";
import { translate } from "locale";
import { Alert } from "react-native";
import * as Recoil from "recoil";
import { cells } from "mocks/cells";

describe("Test for the Home Slider", () => {
    test("Renders correctly without accounts", () => {
        jest.spyOn(Alert, "alert");
        const screen = render(<HomeSlider />);
        const button = screen.getByText(translate("add_an_account"));
        expect(button).toBeDefined();
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith("Add account");
    });
    test("Renders correctly with cells", () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ hasWallet: true, isAuthenticated: true, name: "wallet", cells: cells });
        const screen = render(<HomeSlider />);
        expect(screen.getAllByText(cells[0].name)).toBeDefined();
        expect(screen.getAllByText(cells[1].name)).toBeDefined();
        expect(screen.getAllByText(cells[2].name)).toBeDefined();
    });
});
