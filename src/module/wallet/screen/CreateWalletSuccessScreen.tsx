import { useEffect } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import createServiceInstance from "module/wallet/hook/serviceInstanceCreation";

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

            setWalletState((state) => ({
                ...state,
                wallets: [{ name: name!, colorIndex: 0, index: 0 }],
                hasWallet: true,
                isAuthenticated: true,
                selectedWallet: 0,
            }));
            setSettingsState(defaultSettingsState);

            if (mnemonic) {
                await createServiceInstance({ walletIndex: 0, nameId: name!, mnemonic: mnemonic! });
            }

            resetCreateWalletState();
        };
        setTimeout(setStorage, 2000);
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
