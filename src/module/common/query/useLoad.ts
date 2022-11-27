import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import { createServiceInstance } from "module/wallet/state/ServiceInstance/ServiceInstance";
import { getWallet, removeKeysFromWallets } from "module/wallet/utils/wallet.utils";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);

    useEffect(() => {
        const getStorage = async () => {
            //Get the settings from storage
            const settings = (await SettingsStorage.getAllSettings()) || defaultSettingsState;

            //Check if there is a previous wallet
            const orderedWallets = await WalletStorage.getWallets(settings.network);

            //Has already a wallet if not will go to CreateWallet
            if (orderedWallets) {
                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    wallets: removeKeysFromWallets(orderedWallets),
                }));

                //Set the settings to the state
                setSettingsState(settings);

                for (let i = 0; i < orderedWallets.length; i += 1) {
                    const { account, privateKey } = getWallet(i, orderedWallets)!;
                    await createServiceInstance({ serviceIndex: i, nameId: account, secretKey: privateKey, network: settings.network });
                }
            }
            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
