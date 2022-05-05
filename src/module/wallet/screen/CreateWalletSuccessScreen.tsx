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
import { WalletState } from "ckb-peersyst-sdk";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const {
        state: { mnemonic, pin, name },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);

    useEffect(() => {
        const setStorage = async () => {
            await WalletStorage.setSecure({ pin: pin!, wallets: [{ name: name!, colorIndex: 0, mnemonic: mnemonic!, index: 0 }] });
            await SettingsStorage.set(defaultSettingsState);

            if (mnemonic) {
                if (!serviceInstancesMap.has(0)) {
                    serviceInstancesMap.set(
                        0,
                        new CKBSDKService(mnemonic.join(" "), undefined, async (walletState: WalletState) => {
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

            //Use another thread
            setTimeout(async () => {
                await serviceInstancesMap.get(0)?.synchronize();
            });

            resetCreateWalletState();
        };
        setTimeout(setStorage, 2000);
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
