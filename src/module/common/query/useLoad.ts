import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { StorageWallet, WalletStorage } from "module/wallet/WalletStorage";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import { CKBSDKService } from "../service/CkbSdkService";

export const serviceInstancesMap = new Map<number, CKBSDKService>();

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    useEffect(() => {
        const getStorage = async () => {
            //Check if there is a previous wallet
            const wallets = await WalletStorage.getWallets();
            console.log("useLoad=getStorage, wallets:");
            console.log(wallets);
            //Has already a wallet if not will go to CreateWallet
            if (wallets) {
                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    wallets,
                }));

                const walletsSynchronized: StorageWallet[] = [];
                for (let i = 0; i < wallets.length; i += 1) {
                    if (!serviceInstancesMap.has(i)) {
                        serviceInstancesMap.set(i, new CKBSDKService(wallets[i].mnemonic.join(" "), wallets[i].initialState));
                    }
                    const newWalletState = await serviceInstancesMap.get(i)?.synchronize();
                    console.log(newWalletState);
                    walletsSynchronized.push({ ...wallets[i], initialState: newWalletState });
                }

                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    wallets: walletsSynchronized,
                }));

                //Get the settings from storage and set it to the state
                const settings = (await SettingsStorage.getAllSettings()) || defaultSettingsState;
                setSettingsState(settings);
            }
            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
