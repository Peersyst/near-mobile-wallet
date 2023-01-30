import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState, NetworkType } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import { Chains } from "near-peersyst-sdk";
import { useConfig } from "@peersyst/react-native-components";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const recoverWallets = useRecoverWallets();
    const enableChangeNetwork = useConfig("enableChangeNetwork");

    useEffect(() => {
        const getStorage = async () => {
            const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };
            let hasPreviousWallet = await recoverWallets(settings.network);
            if (hasPreviousWallet) setSettingsState(settings);
            else if (enableChangeNetwork) {
                const network: NetworkType = settings.network === Chains.TESTNET ? Chains.MAINNET : Chains.TESTNET;
                hasPreviousWallet = await recoverWallets(network);

                if (hasPreviousWallet) {
                    await SettingsStorage.set({ network });
                    setSettingsState({ ...settings, network });
                }
            }
            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
