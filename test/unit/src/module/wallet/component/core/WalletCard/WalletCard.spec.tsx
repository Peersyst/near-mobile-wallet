import { render, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import * as Recoil from "recoil";
import * as ExpoHaptics from "expo-haptics";
import { capitalize } from "@peersyst/react-utils";
import { config } from "config";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("WalletCard tests", () => {
    const { state } = new UseWalletStateMock();
    const wallet = state.wallets[0];
    const { serviceInstance } = new UseGetServiceInstanceMock();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 10400,
        });
    });

    test("Renders correctly", async () => {
        const screen = render(<WalletCard wallet={wallet} />);
        /**Account header */
        expect(screen.getByText(wallet.name)).toBeDefined();

        /**Account Balance */
        await waitFor(() => expect(screen.getByText("10,400 " + config.tokenName)).toBeDefined());

        /**Account Buttons */
        expect(screen.getByText(capitalize(translate("send")))).toBeDefined();
        expect(screen.getByText(capitalize(translate("receive")))).toBeDefined();
    });

    test("Change the currency when the user clicks on the balance", async () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ fiat: "eur" });
        const mockedVibrate = jest.fn();
        jest.spyOn(ExpoHaptics, "impactAsync").mockImplementation(mockedVibrate);
        const screen = render(<WalletCard wallet={wallet} />);
        /**Account Balance */
        await waitFor(() => expect(screen.getByText("10,400 " + config.tokenName)).toBeDefined());
        const text = screen.getByText("10,400 " + config.tokenName);
        fireEvent.press(text);
        await waitFor(() => expect(screen.getByText(CURRENCY_UNIT["eur"] + " 10")).toBeDefined());
        expect(mockedVibrate).toHaveBeenCalled();
    });
});
