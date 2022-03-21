import ConfirmPinScreen from "module/settings/screen/ConfirmPinScreen";
import { fireEvent, render, SuccessApiCall, waitFor } from "test-utils";
import * as Recoil from "recoil";
import { WalletStorage } from "module/wallet/WalletStorage";

describe("Test for the Confirm Pin Screen", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Confirms password correctly", async() => {
        const mockedSetPinConfirmedState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetPinConfirmedState);
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const screen = render(<ConfirmPinScreen />);
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        await waitFor(() => expect(mockedSetPinConfirmedState).toHaveBeenCalled());
    });
    test("Confirms password correctly", async() => {

        const mockedSetPinConfirmedState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetPinConfirmedState);
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("4567"));
        const screen = render(<ConfirmPinScreen />);
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        await waitFor(() => expect(mockedSetPinConfirmedState).not.toHaveBeenCalled());
    });
});
