import { render, SuccessApiCall } from "test-utils";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { translate } from "locale";
import * as GetFee from "module/transaction/mock/getFee";
import * as Recoil from "recoil";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("SendModal tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetFee, "default").mockReturnValue(SuccessApiCall("10"));
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(12000), occupiedBalance: BigInt(2000), freeBalance: BigInt(10000) }),
        );
    });

    test("Renders correctly", () => {
        const screen = render(<SendModal />);
        expect(screen.getByText(translate("send"))).toBeDefined();
    });

    test("Resets send state on close", async () => {
        const handleExited = jest.fn();
        const resetSendState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetSendState);
        const screen = render(<SendModal onExited={handleExited} />);
        fireEvent.press(screen.getByTestId("BackIcon"));
        await waitFor(() => expect(resetSendState).toHaveBeenCalled());
        expect(handleExited).toHaveBeenCalled();
    });

    test("Send is completed successfully", async () => {
        const screen = render(<SendModal />);

        // Enter receiver address, sender address equals the selected account (0)
        fireEvent.changeText(screen.getByPlaceholderText(translate("address")), "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn");
        fireEvent.press(screen.getByText(translate("next")));

        // Enter amount and message
        await waitFor(() => fireEvent.changeText(screen.getByPlaceholderText(translate("enter_amount")), "1000"));
        fireEvent.changeText(screen.getByPlaceholderText(translate("write_a_message")), "This is a message");
        fireEvent.press(screen.getByText(translate("next")));

        // Confirmation
        await waitFor(() => expect(screen.getByText("1,000")).toBeDefined());
    });
});
