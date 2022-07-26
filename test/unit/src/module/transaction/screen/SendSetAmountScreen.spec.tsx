import { render, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import SendSetAmountScreen from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import * as Recoil from "recoil";
import * as Genesys from "@peersyst/react-native-components";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { FeeRate } from "near-peersyst-sdk";
import { config } from "config";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("SendAmountAndMessageScreen tests", () => {
    new UseWalletStateMock();
    new UseServiceInstanceMock();
    const setSendState = jest.fn();

    beforeAll(() => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([{}, setSendState]);
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ fee: FeeRate.NORMAL });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const screen = render(<SendSetAmountScreen />);
        await waitFor(() => expect(screen.getByPlaceholderText(translate("enter_amount"))).toBeDefined());
        expect(screen.getAllByText(config.tokenName)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee", { fee: "0.001", token: config.tokenName }))).toBeDefined();
        expect(screen.getByPlaceholderText(translate("write_a_message"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Sets send state and advances to next screen", async () => {
        const setTab = jest.fn();
        jest.spyOn(Genesys, "useSetTab").mockReturnValue(setTab);
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
