import { render, SuccessApiCall } from "test-utils";
import * as GetFee from "module/transaction/mock/getFee";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { translate } from "locale";
import SendSetAmountScreen from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import * as Recoil from "recoil";
import * as UseSetTab from "module/common/component/base/navigation/Tabs/hook/useSetTab";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("SendAmountAndMessageScreen tests", () => {
    beforeAll(() => {
        jest.spyOn(GetFee, "default").mockReturnValue(SuccessApiCall("10"));
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(1200), occupiedBalance: BigInt(200), freeBalance: BigInt(1000) }),
        );
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const screen = render(<SendSetAmountScreen />);
        await waitFor(() => expect(screen.getByPlaceholderText(translate("enter_amount"))).toBeDefined());
        expect(screen.getByText("CKB")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee", { fee: "10" }))).toBeDefined();
        expect(screen.getByPlaceholderText(translate("write_a_message"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Renders correctly with type dao deposit", async () => {
        const screen = render(<SendSetAmountScreen type="dao" />);
        await waitFor(() => expect(screen.getByPlaceholderText(translate("enter_amount"))).toBeDefined());
        expect(screen.getByText(translate("deposit_warning"))).toBeDefined();
    });

    test("Sets send state and advances to next screen", async () => {
        const setSendState = jest.fn();
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([{}, setSendState]);
        const setTab = jest.fn();
        jest.spyOn(UseSetTab, "default").mockReturnValue(setTab);
        const screen = render(<SendSetAmountScreen />);
        const amountInput = await waitFor(() => screen.getByPlaceholderText(translate("enter_amount")));
        fireEvent.changeText(amountInput, "100");
        const messageTextArea = screen.getByPlaceholderText(translate("write_a_message"));
        fireEvent.changeText(messageTextArea, "Message");
        fireEvent.press(screen.getByText(translate("next")));
        await waitFor(() => expect(setSendState).toHaveBeenCalled());
        expect(setTab).toHaveBeenCalledWith(SendScreens.CONFIRMATION);
    });
});
