import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import { CKBSDKService } from "../service/CkbSdkService";
import useWalletsSync from "module/wallet/hook/useWalletsSync";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    const synchronizeWallets = useWalletsSync();
    useEffect(() => {
        const getStorage = async () => {
            //Check if there is a previous wallet
            const wallets = await WalletStorage.getWallets();
            //Has already a wallet if not will go to CreateWallet
            if (wallets) {
                for (let i = 0; i < wallets.length; i += 1) {
                    if (!serviceInstancesMap.has(i)) {
                        serviceInstancesMap.set(i, new CKBSDKService(wallets[i].mnemonic.join(" "), wallets[i].initialState));
                    }
                }

                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    wallets: wallets.map(({ mnemonic, ...wallet }) => wallet),
                }));

                synchronizeWallets();

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
