import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import walletState from "module/wallet/state/WalletState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { useState } from "react";
import useInitWallets from "./useInitWallets";
import { usePostHog } from "posthog-react-native";
import useCaptureAccounts from "../query/useCaptureAccounts";

export interface UseChangeNetworkResult {
    isLoading: boolean;
    isSuccess: boolean;
    changeNetwork: (network: NetworkType) => Promise<void>;
    reset: () => void;
}

export default (): UseChangeNetworkResult => {
    const recoverWallets = useRecoverWallets();
    const initWallets = useInitWallets();
    const setWalletState = useSetRecoilState(walletState);
    const [settings, setSettings] = useRecoilState(settingsState);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const posthog = usePostHog();
    const { mutate: captureAccounts } = useCaptureAccounts();

    async function changeNetwork(network: NetworkType): Promise<void> {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const hasWallets = await recoverWallets(network);
        if (!hasWallets) {
            const wallets = await initWallets(network);
            setWalletState((state) => ({ ...state, selectedWallet: 0, wallets, hasWallets: true }));
        }

        await Promise.all([SettingsStorage.set({ network }), new Promise((resolve) => setTimeout(resolve, 2000))]);

        setSettings({ ...settings, network });

        try {
            posthog?.capture("change_network", {
                network,
            });
            captureAccounts();
        } catch {}

        setIsLoading(false);
        setIsSuccess(true);
    }

    const reset = () => {
        setIsSuccess(false);
    };

    return {
        isLoading,
        isSuccess,
        changeNetwork,
        reset,
    };
};
