import BuySuccessScreen from "module/fiatorders/screen/BuySuccessScreen/BuySuccessScreen";
import { fireEvent, render, screen, translate } from "test-utils";
import * as Navigation from "@react-navigation/native";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";

describe("BuySuccessScreen test", () => {
    test("Renders correctly", () => {
        render(<BuySuccessScreen />);
        expect(screen.getByText(translate("cryptoWithFiatPurchaseCompleted"))).toBeDefined();
        expect(screen.getByText(translate("cryptoWithFiatPurchaseCompletedMessage"))).toBeDefined();
        expect(screen.getByRole("button", { name: translate("close") })).toBeDefined();
    });

    test("Navigates correctly", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigate });
        render(<BuySuccessScreen />);
        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        expect(mockedNavigate).toBeCalledWith(MainScreens.MAIN);
    });
});
