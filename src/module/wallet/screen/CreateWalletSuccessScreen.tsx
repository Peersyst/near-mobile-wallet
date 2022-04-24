import { useEffect } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useWalletSync from "module/wallet/hook/useWalletSync";
import { WalletState } from "@peersyst/ckb-peersyst-sdk";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const {
        state: { mnemonic, pin, name },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);
    const syncWallet = useWalletSync();

    useEffect(() => {
        const setStorage = async () => {
            await WalletStorage.set({ pin: pin!, wallets: [{ name: name!, colorIndex: 0, mnemonic: mnemonic!, index: 0 }] });
            await SettingsStorage.set(defaultSettingsState);
            // console.log("setStorage");
            // console.log("mnemonic", mnemonic);

            if (mnemonic) {
                if (!serviceInstancesMap.has(0)) {
                    // console.log("not in map");
                    serviceInstancesMap.set(
                        0,
                        new CKBSDKService(mnemonic.join(" "), undefined, async (walletState: WalletState) => {
                            console.log("received on sync call!!");
                            console.log(!!walletState);
                            console.log(walletState.addressMap);
                            setWalletState((state) => ({
                                ...state,
                                wallets: state.wallets.map((w, idx) => (idx === 0 ? { ...w, initialState: walletState } : w)),
                            }));
                            await WalletStorage.setInitialState(0, walletState);
                        }),
                    );
                }
            }

            setSettingsState(defaultSettingsState);
            setWalletState((state) => ({
                ...state,
                wallets: [{ name: name!, colorIndex: 0, index: 0 }],
                hasWallet: true,
                isAuthenticated: true,
                selectedWallet: 0,
            }));

            console.log("syncing wallet 0....");
            await syncWallet(0);
            resetCreateWalletState();
        };
        setTimeout(setStorage, 2000);
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
