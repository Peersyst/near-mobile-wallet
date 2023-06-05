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
        const acountBalance = new AccountBalanceMock({ available: "100000" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(acountBalance);
    });

    test("Renders correctly", () => {
        const screen = render(<SendModal />);
        expect(screen.getByText(translate("send").toUpperCase())).toBeDefined();
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
});
