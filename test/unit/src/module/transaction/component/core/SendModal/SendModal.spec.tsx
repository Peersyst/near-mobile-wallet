import { render, translate } from "test-utils";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import * as Recoil from "recoil";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { UseWalletStateMock, UseServiceInstanceMock, AccountBalanceMock } from "test-mocks";

describe("SendModal tests", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseServiceInstanceMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeAll(() => {
        const acountBalance = new AccountBalanceMock();
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(acountBalance);
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

    /*  test("Send is completed successfully", async () => {
        const screen = render(<SendModal />);

        // Enter receiver address, sender address equals the selected account (0)
        fireEvent.changeText(screen.getByPlaceholderText(translate("address")), MOCKED_NAMED_ADDRESS);
        fireEvent.press(screen.getByText(translate("next")));

        // Enter amount and message
        await waitFor(() => fireEvent.changeText(screen.getByPlaceholderText(translate("enter_amount")), "6000"));
        fireEvent.changeText(screen.getByPlaceholderText(translate("write_a_message")), "This is a message");
        fireEvent.press(screen.getByText(translate("next")));
        screen.debug();
        // Confirmation
        await waitFor(() => expect(screen.getByText(`6,000 ${config.tokenName}`)).toBeDefined());
    }); */
});
