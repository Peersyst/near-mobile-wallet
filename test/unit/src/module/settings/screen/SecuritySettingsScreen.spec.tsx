import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";
import { fireEvent, render, SuccessApiCall, translate } from "test-utils";
import * as Genesys from "@peersyst/react-native-components";
import { WalletStorage } from "module/wallet/WalletStorage";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { waitFor } from "@testing-library/react-native";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { UseServiceInstanceMock, UseWalletStateMock, WalletMock, WalletStateMock } from "test-mocks";

describe("Test for the SecuritySettingsScreen", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SecuritySettingsScreen />);
        expect(screen.getByText(translate("change_passcode")));
    });

    test("Open confirm modal to update pin", () => {
        new UseWalletStateMock();
        new UseServiceInstanceMock();
        const showModal = jest.fn();
        jest.spyOn(Genesys, "useModal").mockReturnValue({ showModal } as any);
        const screen = render(<SecuritySettingsScreen />);
        const button = screen.getByText(translate("change_passcode"));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalled();
    });

    test("Deletes data", async () => {
        const resetWalletState = jest.fn();
        new UseWalletStateMock({ reset: resetWalletState });
        new UseServiceInstanceMock();
        const clearWalletStorage = jest.spyOn(WalletStorage, "clearAll").mockReturnValue(SuccessApiCall(undefined));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const clearSettingsStorage = jest.spyOn(SettingsStorage, "clear").mockReturnValue(SuccessApiCall(undefined));
        const screen = render(<SecuritySettingsScreen />);
        const button = screen.getByText(translate("delete_data"));
        fireEvent.press(button);
        expect(screen.getByText(translate("delete_data_text"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("delete")));
        expect(screen.getByText(translate("enter_your_pin").toUpperCase())).toBeDefined();
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(clearWalletStorage).toHaveBeenCalled());
        await waitFor(() => expect(clearSettingsStorage).toHaveBeenCalled());
        await waitFor(() => expect(resetWalletState).toHaveBeenCalled());
    });

    test("Deletes only wallet and data", async () => {
        new UseServiceInstanceMock();
        const clearInstances = jest.spyOn(serviceInstancesMap, "clear").mockReturnValue();
        const resetWalletState = jest.fn();
        const state = new WalletStateMock({ wallets: [new WalletMock()] });
        new UseWalletStateMock({ reset: resetWalletState, state });
        const clearWalletStorage = jest.spyOn(WalletStorage, "clearAll").mockReturnValue(SuccessApiCall(undefined));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const clearSettingsStorage = jest.spyOn(SettingsStorage, "clear").mockReturnValue(SuccessApiCall(undefined));
        const screen = render(<SecuritySettingsScreen />);
        const button = screen.getByText(translate("delete_a_wallet"));
        fireEvent.press(button);
        const wallet = screen.getByText(state.wallets[0].name);
        fireEvent.press(wallet);
        await waitFor(() =>
            expect(screen.getByText(translate("delete_only_wallet_text", { walletName: state.wallets[0].name }))).toBeDefined(),
        );
        fireEvent.press(screen.getAllByText(translate("delete_wallet", { walletName: state.wallets[0].name }))[1]);
        expect(screen.getByText(translate("enter_your_pin").toUpperCase())).toBeDefined();
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(clearWalletStorage).toHaveBeenCalled());
        await waitFor(() => expect(clearSettingsStorage).toHaveBeenCalled());
        await waitFor(() => expect(resetWalletState).toHaveBeenCalled());
        await waitFor(() => expect(clearInstances).toHaveBeenCalled());
    });

    test("Deletes first wallet", async () => {
        const removeWallet = jest.spyOn(WalletStorage, "removeWallet").mockReturnValue(SuccessApiCall(undefined));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const setWalletState = jest.fn();
        const { state } = new UseWalletStateMock({ setWallets: setWalletState });
        serviceInstancesMap.set(0, {} as any);
        serviceInstancesMap.set(1, {} as any);
        const setInstance = jest.spyOn(serviceInstancesMap, "set").mockReturnValue({} as any);
        const deleteInstance = jest.spyOn(serviceInstancesMap, "delete").mockReturnValue({} as any);
        const screen = render(<SecuritySettingsScreen />);
        const button = screen.getByText(translate("delete_a_wallet"));
        fireEvent.press(button);
        fireEvent.press(screen.getByText(state.wallets[0].name));
        await waitFor(() => expect(screen.getByText(translate("delete_wallet_text", { walletName: state.wallets[0].name }))).toBeDefined());
        fireEvent.press(screen.getAllByText(translate("delete_wallet", { walletName: state.wallets[0].name }))[1]);
        expect(screen.getByText(translate("enter_your_pin").toUpperCase())).toBeDefined();
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(removeWallet).toHaveBeenCalledWith(0));
        await waitFor(() => expect(setInstance).toHaveBeenCalled());
        await waitFor(() => expect(deleteInstance).toHaveBeenCalled());
        serviceInstancesMap.clear();
    });
});
