import { useEffect } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import statusBarState from "module/common/component/base/layout/StatusBar/state/StatusBarState";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const {
        state: { mnemonic, pin, name },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    const setStatusBarState = useSetRecoilState(statusBarState);
    useEffect(() => {
        const setStorage = async () => {
            await WalletStorage.set({ name: name!, pin: pin!, mnemonic: mnemonic! });
            await SettingsStorage.set(defaultSettingsState);
            setSettingsState(defaultSettingsState);
            setWalletState((state) => ({ ...state, hasWallet: true, isAuthenticated: true }));
        };
        setTimeout(setStorage, 2000);
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
