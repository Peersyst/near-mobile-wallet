import { fireEvent, render, waitFor } from "test-utils";
import SelectDAOWallet from "module/dao/component/core/DAOAccountCard/DAOCardHeader/SelectDAOWallet/SelectDAOWallet";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the SelectDAOWallet", () => {
    const { serviceInstance } = new UseServiceInstanceMock();

    beforeEach(() => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 14567,
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        new UseWalletStateMock();
        const screen = render(<SelectDAOWallet />);
        await waitFor(() => expect(screen.getAllByText("14,567")).toHaveLength(2));
    });
    test("Updates global selectedWallet correctly", async () => {
        const setSelectedWallet = jest.fn();
        new UseWalletStateMock({ setSelectedWallet });
        const screen = render(<SelectDAOWallet />);
        await waitFor(() => expect(screen.getAllByText("14,567")).toHaveLength(2));
        const walletItem = screen.getAllByText("14,567")[1];
        fireEvent.press(walletItem);
        expect(setSelectedWallet).toBeCalledWith(1);
    });
});
