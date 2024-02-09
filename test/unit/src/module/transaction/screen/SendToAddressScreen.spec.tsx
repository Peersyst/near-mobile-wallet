import { formatBalance, render, translate, wait } from "test-utils";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen";
import * as Recoil from "recoil";
import * as Genesys from "@peersyst/react-native-components";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { MOCKED_NAMED_ADDRESS, UseGetBalanceMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { config } from "config";
import { SendScreens } from "module/transaction/screen/SendScreens.types";

describe("SendToAddressScreen tests", () => {
    const {
        balance: { available },
    } = new UseGetBalanceMock();
    const { state } = new UseWalletStateMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SendToAddressScreen />);
        expect(screen.getByText(translate("select_a_wallet"))).toBeDefined();
        expect(screen.getByText(state.wallets[0].account)).toBeDefined();
        expect(screen.getByText(translate("send_to"))).toBeDefined();
        expect(screen.getByPlaceholderText(translate("address"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Renders correctly when an addresses had been selected previously", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([{ senderWalletIndex: 1, receiverAddress: MOCKED_NAMED_ADDRESS }, jest.fn()]);
        const screen = render(<SendToAddressScreen />);
        expect(screen.getByText(state.wallets[1].account)).toBeDefined();
        expect(screen.getByDisplayValue(MOCKED_NAMED_ADDRESS)).toBeDefined();
    });

    test("Sets send state and advances to next tab", async () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        jest.spyOn(serviceInstance, "acccountIsValidReceivingAccount").mockResolvedValue(true);
        const setSendState = jest.fn();
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([{ senderWalletIndex: 1 }, setSendState]);
        const setTab = jest.fn();
        jest.spyOn(Genesys, "useSetTab").mockReturnValue(setTab);
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ network: "mainnet" });
        const screen = render(<SendToAddressScreen />);
        await waitFor(() => expect(screen.getByText(formatBalance(available, { units: config.tokenName }))).toBeDefined());
        const input = screen.getByPlaceholderText(translate("address"));
        fireEvent.changeText(input, MOCKED_NAMED_ADDRESS);
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
        await waitFor(() => {
            expect(input.props.value).toBe(MOCKED_NAMED_ADDRESS);
        });
        await wait(700);
        fireEvent.press(screen.getByText(translate("next")));
        await waitFor(() => expect(setSendState).toHaveBeenCalled());
        expect(setTab).toHaveBeenCalledWith(SendScreens.AMOUNT_AND_MESSAGE);
    });
});
