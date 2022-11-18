import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("WalletSelector tests", () => {
    const { serviceInstance } = new UseServiceInstanceMock();
    const { state } = new UseWalletStateMock();
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 1,
            occupiedBalance: 0,
            available: 1,
        });
        const screen = render(<WalletSelector />);
        fireEvent.press(screen.getByText(state.wallets[0].name));
        expect(await screen.findAllByText("1")).toHaveLength(3);
    });
});
