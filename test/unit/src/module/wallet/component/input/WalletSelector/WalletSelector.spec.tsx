import { render } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("WalletSelector tests", () => {
    const { serviceInstance } = new UseGetServiceInstanceMock();
    const { state } = new UseWalletStateMock();
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 1,
            occupiedBalance: 0,
            freeBalance: 1,
        } as any);

        const screen = render(<WalletSelector />);

        expect(screen.getAllByText(state.wallets[0].name)).toHaveLength(2);
        await waitFor(() => expect(screen.getAllByText("1")).toHaveLength(3));
    });
});
