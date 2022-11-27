import { useEffect } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import { createServiceInstance } from "module/wallet/state/ServiceInstance/ServiceInstance";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const {
        state: { mnemonic, pin },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);
    const [{ network }, setSettingsState] = useRecoilState(settingsState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);

    useEffect(() => {
        const setStorage = async () => {
            //TODO: get wallets from SDK with a util
            const wallets = [] as any;
            const parsedMnemonic = mnemonic?.join(" ")!;
            await WalletStorage.setWalletStorage({ pin, mnemonic: parsedMnemonic, [network]: wallets });
            await SettingsStorage.set(defaultSettingsState);

            setWalletState((state) => ({
                ...state,
                wallets: wallets,
                hasWallet: true,
                isAuthenticated: true,
                selectedWallet: 0,
            }));
            setSettingsState(defaultSettingsState);

            if (mnemonic) {
                await createServiceInstance({ serviceIndex: 0, mnemonic: parsedMnemonic, network });
            }

            resetCreateWalletState();
        };
        setTimeout(setStorage, 2000);
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
