import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { AccountBalanceMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("WalletSelector tests", () => {
    const { state } = new UseWalletStateMock();
    const { serviceInstance } = new UseServiceInstanceMock();
    const accountBalance = new AccountBalanceMock({
        total: "1",
        staked: "0",
        available: "1",
    });
    jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const screen = render(<WalletSelector />);
        fireEvent.press(screen.getByText(state.wallets[0].account));
        expect(await screen.findAllByText(accountBalance.available)).toHaveLength(3);
    });
});
