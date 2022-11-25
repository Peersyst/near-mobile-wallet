import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createServiceInstance from "module/wallet/utils/createServiceInstance";
import { getWallet, orderWallets } from "module/wallet/utils/wallet.utils";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);

    useEffect(() => {
        const getStorage = async () => {
            //Get the settings from storage
            const settings = (await SettingsStorage.getAllSettings()) || defaultSettingsState;

            //Check if there is a previous wallet
            const wallets = await WalletStorage.getWallets(settings.network);
            const mnemonic = await WalletStorage.getMnemonic();

            //Has already a wallet if not will go to CreateWallet
            if (wallets) {
                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    //Order wallets and remove secret/mnemonic
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    wallets: orderWallets(wallets.map(({ privateKey, ...wallet }) => wallet)),
                }));

                //Set the settings to the state
                setSettingsState(settings);

                for (let i = 0; i < wallets.length; i += 1) {
                    const { account, privateKey } = getWallet(i, wallets)!;
                    await createServiceInstance({ walletIndex: i, nameId: account, secretKey: privateKey });
                }
            }
            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
