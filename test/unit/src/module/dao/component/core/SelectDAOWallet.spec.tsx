import { fireEvent, render, translate } from "test-utils";
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
        const walletCardIcon = screen.getByTestId("FilledWalletIcon");
        expect(walletCardIcon).toBeDefined();
    });
    test("Updates global selectedWallet correctly", async () => {
        const setSelectedWallet = jest.fn();
        new UseWalletStateMock({ setSelectedWallet });
        const screen = render(<SelectDAOWallet />);
        const walletCardIcon = screen.getByTestId("FilledWalletIcon");
        expect(walletCardIcon).toBeDefined();
        const displayButton = screen.getByTestId("select-display-touchable");
        fireEvent.press(displayButton);
        expect(screen.getByText(translate("select_a_wallet"))).toBeDefined();
        const walletItems = await screen.findAllByText("14,567");
        expect(walletItems.length).toBe(2);
        fireEvent.press(walletItems[1]);
        expect(setSelectedWallet).toBeCalledWith(1);
    });
});
