import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";
import { fireEvent, render, SuccessApiCall, translate } from "test-utils";
import * as Genesys from "@peersyst/react-native-components";
import { WalletStorage } from "module/wallet/WalletStorage";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { waitFor } from "@testing-library/react-native";
import * as Recoil from "recoil";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("Test for the SecuritySettingsScreen", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("change_passcode")));
    });

    test("Open confirm modal to update pin", () => {
        const showModal = jest.fn();
        jest.spyOn(Genesys, "useModal").mockReturnValue({ showModal } as any);
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        const button = screen.getByText(translate("change_passcode"));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalled();
    });

    test("Deletes data", async () => {
        const clearWalletStorage = jest.spyOn(WalletStorage, "clearAll").mockReturnValue(SuccessApiCall(undefined));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const clearSettingsStorage = jest.spyOn(SettingsStorage, "clear").mockReturnValue(SuccessApiCall(undefined));
        const resetWalletState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetWalletState);
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        const button = screen.getByText(translate("delete_data"));
        fireEvent.press(button);
        expect(screen.getByText(translate("delete_data_text"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("delete")));
        expect(screen.getByText(translate("enter_your_pin"))).toBeDefined();
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(clearWalletStorage).toHaveBeenCalled());
        await waitFor(() => expect(clearSettingsStorage).toHaveBeenCalled());
        await waitFor(() => expect(resetWalletState).toHaveBeenCalled());
    });

    test("Deletes only wallet and data", async () => {
        const clearWalletStorage = jest.spyOn(WalletStorage, "clearAll").mockReturnValue(SuccessApiCall(undefined));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const clearSettingsStorage = jest.spyOn(SettingsStorage, "clear").mockReturnValue(SuccessApiCall(undefined));
        const resetWalletState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetWalletState);
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([
            { ...mockedUseWallet.state, wallets: [mockedUseWallet.state.wallets[0]] },
            jest.fn(),
        ]);
        const clearInstances = jest.spyOn(serviceInstancesMap, "clear").mockReturnValue();
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        const button = screen.getByText(translate("delete_a_wallet"));
        fireEvent.press(screen.getByText(mockedUseWallet.state.wallets[0].name));
        fireEvent.press(button);
        await waitFor(() =>
            expect(
                screen.getByText(translate("delete_only_wallet_text", { walletName: mockedUseWallet.state.wallets[0].name })),
            ).toBeDefined(),
        );
        fireEvent.press(screen.getAllByText(translate("delete_wallet", { walletName: mockedUseWallet.state.wallets[0].name }))[1]);
        expect(screen.getByText(translate("enter_your_pin"))).toBeDefined();
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
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([mockedUseWallet.state, setWalletState]);
        serviceInstancesMap.set(0, {} as any);
        serviceInstancesMap.set(1, {} as any);
        const setInstance = jest.spyOn(serviceInstancesMap, "set").mockReturnValue({} as any);
        const deleteInstance = jest.spyOn(serviceInstancesMap, "delete").mockReturnValue({} as any);
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        const button = screen.getByText(translate("delete_a_wallet"));
        fireEvent.press(screen.getByText(mockedUseWallet.state.wallets[0].name));
        fireEvent.press(button);
        await waitFor(() =>
            expect(screen.getByText(translate("delete_wallet_text", { walletName: mockedUseWallet.state.wallets[0].name }))).toBeDefined(),
        );
        fireEvent.press(screen.getAllByText(translate("delete_wallet", { walletName: mockedUseWallet.state.wallets[0].name }))[1]);
        expect(screen.getByText(translate("enter_your_pin"))).toBeDefined();
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(removeWallet).toHaveBeenCalledWith(0));
        await waitFor(() => expect(setInstance).toHaveBeenCalled());
        await waitFor(() => expect(deleteInstance).toHaveBeenCalled());
        serviceInstancesMap.clear();
    });
});
