import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import { Chains } from "near-peersyst-sdk";
import WalletController from "module/wallet/utils/WalletController";
import { FlagsStorage } from "module/settings/FlagsStorage";
import { WalletStorage } from "module/wallet/WalletStorage";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const recoverWallets = useRecoverWallets();

    useEffect(() => {
        const getStorage = async () => {
            const hasMnemonic = await WalletController.hasMnemonic();
            const flags = await FlagsStorage.get();
            const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };

            if (!hasMnemonic) await SettingsStorage.set(settings);
            else {
                // [MAINNET RELEASE]: Removes wallets and forces network to MAINNET when upgrading
                if (!flags.forcedMainnet) {
                    if (settings.network !== Chains.MAINNET) {
                        settings.network = Chains.MAINNET;
                        await SettingsStorage.set({ network: Chains.MAINNET });
                    }
                    await Promise.all([WalletStorage.clearAll(), FlagsStorage.set({ forcedMainnet: true })]);
                } else {
                    // If already forced to MAINNET and hasWallet = true, recover wallets
                    await recoverWallets(settings.network);
                }
            }

            setSettingsState(settings);

            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
