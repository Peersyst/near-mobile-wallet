import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const recoverWallets = useRecoverWallets();

    useEffect(() => {
        const getStorage = async () => {
            const settings = (await SettingsStorage.getAllSettings()) || defaultSettingsState;
            /**
             * oldStorageWallets: has all the information about the wallets (that is set into the state)
             * walletGroups: has all the privateKeys and walletIds that point into the oldStorageWallets
             */
            const oldStorageWallets = await WalletStorage.getWallets(settings.network);
            const walletGroups = await WalletStorage.getSecureWallets(settings.network);

            //Has already a wallet if not will go to Create/Import Wallet
            if (oldStorageWallets.length !== 0 && walletGroups.length !== 0) {
                setSettingsState(settings);
                await recoverWallets(settings.network, oldStorageWallets, walletGroups);
            }

            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
