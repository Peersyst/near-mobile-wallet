import ReceiveCard from "module/transaction/component/core/ReceiveCard/ReceiveCard";
import { fireEvent, render } from "test-utils";
import * as Router from "module/common/hook/useRoute";
import { cells } from "mocks/cells";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamsList, MainStackParamsList } from "stack-navigator";
import * as Clipboard from "expo-clipboard";
import * as UseToast from "module/common/component/base/feedback/ToastProvider/hooks/useToast";
import { translate } from "locale";
import * as Navigation from "@react-navigation/native";
import { getMockedRouter } from "mocks/router";
import { MainScreens } from "module/main/MainNavigatorGroup";

describe("Test for the receive Card", () => {
    const mockedRouter = getMockedRouter(MainScreens.RECEIVE, { address: cells[0].address })
    test("Renders correctly", () => {
        jest.spyOn(Router, "default").mockReturnValue(mockedRouter);
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(cells[0].address)).toBeDefined();
    });
    test("Copies address correctly", () => {
        const showToast = jest.fn();
        jest.spyOn(Router, "default").mockReturnValue(mockedRouter);
        jest.spyOn(UseToast, "useToast").mockReturnValue({ showToast, hideToast: jest.fn() });
        jest.spyOn(Clipboard, "setString");
        const screen = render(<ReceiveCard />);
        const icon = screen.getByTestId("FilledCopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith(cells[0].address);
        expect(showToast).toHaveBeenCalledWith(translate("address_copied"), { type: "success" });
    });
    test("Goes back correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ canGoBack: mockedNavigation });
        jest.spyOn(Router, "default").mockReturnValue(mockedRouter);
        const screen = render(<ReceiveCard />);
        expect(screen.getByText(cells[0].address)).toBeDefined();
        const text = screen.getByText(translate("go_back"));
        expect(text).toBeDefined();
        expect(screen.getByTestId("BackIcon")).toBeDefined();
        fireEvent.press(text);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
