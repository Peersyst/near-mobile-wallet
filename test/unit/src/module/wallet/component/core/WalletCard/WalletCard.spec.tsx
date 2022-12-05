import { formatBalance, render, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import * as Recoil from "recoil";
import * as ExpoHaptics from "expo-haptics";
import { capitalize } from "@peersyst/react-utils";
import { config } from "config";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { AccountBalanceMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("WalletCard tests", () => {
    const { state } = new UseWalletStateMock();
    const wallet = state.wallets[0];
    const { serviceInstance } = new UseServiceInstanceMock();
    const accountBalance = new AccountBalanceMock();
    jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const screen = render(<WalletCard wallet={wallet} />);
        /**Account header */
        expect(screen.getByText(wallet.account)).toBeDefined();

        /**Account Balance */
        const balance = await screen.findByText(formatBalance(accountBalance.available, { units: config.tokenName }));
        expect(balance).toBeDefined();

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
        const balance = await screen.findByText(formatBalance(accountBalance.available, { units: config.tokenName }));
        expect(balance).toBeDefined();
        fireEvent.press(balance);
        await waitFor(() => expect(screen.getByText(CURRENCY_UNIT["eur"] + " 10")).toBeDefined());
        expect(mockedVibrate).toHaveBeenCalled();
    });
});
