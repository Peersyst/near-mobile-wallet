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
            await WalletStorage.getName()
                .then(async (name) => {
                    //Has wallet
                    if (name) {
                        //Create wallet state
                        setWalletState((state) => ({ ...state, hasWallet: true, name }));
                        //Create settings state based on previous settings
                        await SettingsStorage.getAllSettings()
                            .then((settings) => {
                                setSettingsState((state) => ({ ...state, settings }));
                                setLoading(false);
                            })
                    } else {
                        setLoading(false)
                    }
                });
        }
        getStorage();
    }, [setWalletState]);
    return loading;
}
