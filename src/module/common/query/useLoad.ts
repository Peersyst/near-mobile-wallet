import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import { CKBSDKService } from "../service/CkbSdkService";
import useWalletsSync from "module/wallet/hook/useWalletsSync";
import { WalletState } from "@peersyst/ckb-peersyst-sdk";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    const synchronizeWallets = useWalletsSync();
    useEffect(() => {
        const getStorage = async () => {
            //Check if there is a previous wallet
            const wallets = await WalletStorage.getWallets();
            console.log("inside get storage...");
            // console.log(wallets?.length);
            //Has already a wallet if not will go to CreateWallet
            if (wallets) {
                for (let i = 0; i < wallets.length; i += 1) {
                    // console.log(wallets[i].index);
                    // console.log(wallets[i].mnemonic);
                    console.log(wallets[i].initialState?.accountTransactionMap[0]);
                    // console.log(!!wallets[i].initialState);
                    // console.log(wallets[i].initialState?.addressMap);
                    // console.log(JSON.stringify(wallets[i].initialState?.addressMap));
                    if (!serviceInstancesMap.has(i)) {
                        // console.log("not has");
                        serviceInstancesMap.set(
                            i,
                            new CKBSDKService(wallets[i].mnemonic.join(" "), wallets[i].initialState, async (walletState: WalletState) => {
                                console.log("received on sync call!!");
                                // console.log(!!walletState);
                                // console.log(walletState.addressMap);
                                setWalletState((state) => ({
                                    ...state,
                                    wallets: state.wallets.map((w, idx) => (idx === i ? { ...w, initialState: walletState } : w)),
                                }));
                                await WalletStorage.setInitialState(i, walletState);
                            }),
                        );
                    }
                }
                // console.log("setting wallet state...");

                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    wallets: wallets.map(({ mnemonic, ...wallet }) => wallet),
                }));

                console.log("sync wallets...");
                await synchronizeWallets();

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
