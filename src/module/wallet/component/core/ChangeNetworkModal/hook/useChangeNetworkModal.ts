import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import walletState from "module/wallet/state/WalletState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { useEffect, useState } from "react";
import useInitWallets from "./useInitWallets";

export default () => {
    const recoverWallets = useRecoverWallets();
    const initWallets = useInitWallets();
    const setWalletState = useSetRecoilState(walletState);
    const [settings] = useRecoilState(settingsState);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function changeNetwork(network: NetworkType) {
        const hasWallets = await recoverWallets(network);
        if (!hasWallets) {
            const wallets = await initWallets(network);
            setWalletState((state) => ({ ...state, wallets, hasWallets: true }));
        }
        await SettingsStorage.set({ network });
        setSuccess(true);
        setIsLoading(false);
    }

    useEffect(() => {
        if (isLoading) {
            changeNetwork(settings.network);
        }
    }, [isLoading]);

    const handleOpen = () => {
        setSuccess(false);
        setIsLoading(true);
    };

    return {
        success,
        isLoading,
        showModal: handleOpen,
        hideModal: () => setIsLoading(false),
    };
};
