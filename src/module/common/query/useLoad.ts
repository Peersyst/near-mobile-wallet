import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import { WalletState } from "@peersyst/ckb-peersyst-sdk";
import { CKBSDKService } from "../service/CkbSdkService";

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
                for (let i = 0; i < wallets.length; i += 1) {
                    if (!serviceInstancesMap.has(i)) {
                        serviceInstancesMap.set(
                            i,
                            new CKBSDKService(wallets[i].mnemonic.join(" "), wallets[i].initialState, async (walletState: WalletState) => {
                                setWalletState((state) => ({
                                    ...state,
                                    wallets: state.wallets.map((w, idx) => (idx === i ? { ...w, initialState: walletState } : w)),
                                }));
                                await WalletStorage.setInitialState(i, walletState);
                            }),
                        );
                    }
                }

                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    wallets: wallets.map(({ mnemonic, ...wallet }) => wallet),
                }));

                for (let i = 0; i < wallets.length; i += 1) {
                    await serviceInstancesMap.get(i)?.synchronize();
                }

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
