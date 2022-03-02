import { render } from "test-utils";
import { translate } from "locale";
import AuthSwitchPage from "module/auth/page/AuthSwitchPage/AuthSwitchPage";
import * as Navigation from "@react-navigation/native";
import { fireEvent } from "@testing-library/react-native";

describe("Auth switch page", () => {
    test("Renders correctly", () => {
        const screen = render(<AuthSwitchPage />);
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
        expect(screen.getByText(translate("create_wallet")));
        expect(screen.getByText(translate("import_it")));
        expect(screen.getByText(translate("already_have_wallet")));
    });
    test("Create wallet button onPress works correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<AuthSwitchPage />);
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
        const button = screen.getByText(translate("create_wallet"));
        fireEvent.press(button);
        expect(mockedNavigation).toHaveBeenCalledWith("CreateWallet");
    });
    test("Import button onPress works correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<AuthSwitchPage />);
        const button = screen.getByText(translate("import_it"));
        fireEvent.press(button);
        expect(mockedNavigation).toHaveBeenCalledWith("ImportWallet");
    });
});
