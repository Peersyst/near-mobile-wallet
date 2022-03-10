import * as Recoil from "recoil";
import { WalletStorage } from "module/wallet/WalletStorage";
import { render, SuccessApiCall } from "test-utils";
import IntroduceWalletPinScreen from "module/wallet/screen/IntroduceWalletPinScreen";
import { fireEvent, waitFor } from "@testing-library/react-native";

describe("IntroduceWalletPinScreen test", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Pin is correct", async () => {
        const setWalletState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(setWalletState);
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));

        const screen = render(<IntroduceWalletPinScreen />);
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));

        await waitFor(() => expect(setWalletState).toHaveBeenCalled());
    });

    test("Pin is incorrect", async () => {
        const setWalletState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(setWalletState);
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));

        const screen = render(<IntroduceWalletPinScreen />);
        fireEvent.press(screen.getByText("4"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("1"));

        await waitFor(() => expect(setWalletState).not.toHaveBeenCalled());
    });
});
