import ConfirmPinScreen from "module/settings/screen/ConfirmPinScreen";
import { fireEvent, render, SuccessApiCall, waitFor } from "test-utils";
import * as Recoil from "recoil";
import { WalletStorage } from "module/wallet/WalletStorage";
import { translate } from "locale";
import * as Navigation from "@react-navigation/native";

describe("Test for the Confirm Pin Screen", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", () => {
        const screen = render(<ConfirmPinScreen />);
        expect(screen.getByText(translate("confirm_your_pin")));
        expect(screen.getAllByTestId("BackIcon")).toHaveLength(2);
    });
    test("Confirms password correctly", async () => {
        const mockedSetPinConfirmedState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetPinConfirmedState);
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const screen = render(<ConfirmPinScreen />);
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        await waitFor(() =>
            expect(mockedSetPinConfirmedState).toHaveBeenCalledWith(expect.objectContaining({ pinConfirmed: true, hasNewPin: false })),
        );
    });
    test("Confirms password correctly", async () => {
        const mockedSetPinConfirmedState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetPinConfirmedState);
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1243"));
        const screen = render(<ConfirmPinScreen />);
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        await waitFor(() => expect(mockedSetPinConfirmedState).not.toHaveBeenCalled());
    });
    test("Goes back correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ canGoBack: mockedNavigation });
        const screen = render(<ConfirmPinScreen />);
        const icons = screen.getAllByTestId("BackIcon");
        fireEvent.press(icons[0]);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
