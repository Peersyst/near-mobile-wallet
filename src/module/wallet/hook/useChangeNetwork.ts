import settingsState from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import walletState from "module/wallet/state/WalletState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useState } from "react";
import useInitWallets from "./useInitWallets";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";
import { NetworkType } from "module/common/types";

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

    async function changeNetwork(network: NetworkType): Promise<void> {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const hasWallets = await recoverWallets(network);
        if (!hasWallets) {
            const wallets = await initWallets(network);
            setWalletState((state) => ({ ...state, selectedWallet: 0, wallets, hasWallets: true }));
        }

        // <<< refactor
        await Promise.all([ControllerFactory.settingsController.set({ network }), new Promise((resolve) => setTimeout(resolve, 2000))]);
        // refactor >>>

        setSettings({ ...settings, network });

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
