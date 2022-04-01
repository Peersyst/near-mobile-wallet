import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    useEffect(() => {
        const getStorage = async () => {
            //Check if there is a previous wallet
            const wallets = await WalletStorage.getWallets();
            //Has already a wallet if not will go to CreateWallet
            if (wallets) {
                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    wallets: wallets.map(({ mnemonic, initialState, ...rest }) => ({
                        serviceInstance: new CkbServiceMock(mnemonic, initialState),
                        ...rest,
                    })),
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
