import { render, translate } from "test-utils";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import * as Recoil from "recoil";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { config } from "config";
import { UseWalletStateMock, UseGetServiceInstanceMock } from "test-mocks";

describe("SendModal tests", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseGetServiceInstanceMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeAll(() => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 12000,
            occupiedBalance: 2000,
            freeBalance: 1000000,
        });
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
        fireEvent.changeText(
            screen.getByPlaceholderText(translate("address")),
            "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq03ewkvsva4cchhntydu648l7lyvn9w2cctnpask",
        );
        fireEvent.press(screen.getByText(translate("next")));

        // Enter amount and message
        await waitFor(() => fireEvent.changeText(screen.getByPlaceholderText(translate("enter_amount")), "6000"));
        fireEvent.changeText(screen.getByPlaceholderText(translate("write_a_message")), "This is a message");
        fireEvent.press(screen.getByText(translate("next")));
        screen.debug();
        // Confirmation
        await waitFor(() => expect(screen.getByText(`6,000 ${config.tokenName}`)).toBeDefined());
    });
});
