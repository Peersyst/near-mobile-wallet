import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState from "module/settings/state/SettingsState";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    useEffect(() => {
        const getStorage = async () => {
            //Check if there is a previous wallet
            const name = await WalletStorage.getName();
            //Has already a wallet if not will go to CreateWallet
            if (name) {
                setWalletState((state) => ({ ...state, hasWallet: true, name }));
                //Get the settings from storage and set it to the state
                await SettingsStorage.getAllSettings().then((settings) => {
                    setSettingsState((state) => ({ ...state, settings }));
                });
            }
            setLoading(false);
        };
        getStorage();
    }, [setWalletState]);
    return loading;
}
