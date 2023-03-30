import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import { Chains } from "near-peersyst-sdk";
import useInitWallets from "module/wallet/component/core/ChangeNetworkModal/hook/useInitWallets";
import WalletController from "module/wallet/utils/WalletController";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const recoverWallets = useRecoverWallets();
    const initWallets = useInitWallets();

    useEffect(() => {
        const getStorage = async () => {
            const hasMnemonic = await WalletController.hasMnemonic();

            if (!hasMnemonic) {
                await SettingsStorage.set({ network: Chains.MAINNET, forcedMainnet: true });
            } else {
                const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };

                if (settings.network === Chains.MAINNET) {
                    if (!settings.forcedMainnet) {
                        await SettingsStorage.set({ network: Chains.MAINNET, forcedMainnet: true });
                    }
                } else if (!settings.forcedMainnet) {
                    settings.network = Chains.MAINNET;

                    await SettingsStorage.set({ network: Chains.MAINNET, forcedMainnet: true });

                    await initWallets(Chains.MAINNET);
                }

                await recoverWallets(settings.network);

                setSettingsState(settings);
            }

            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
