import { useEffect } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import { Chains } from "near-peersyst-sdk";
import WalletController from "../utils/WalletController";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const {
        state: { mnemonic, pin },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);
    const [{ network }, setSettingsState] = useRecoilState(settingsState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);

    useEffect(() => {
        const setStorage = async () => {
            const parsedMnemonic = mnemonic?.join(" ")!;
            const { wallets, newSecureWallets, newStorageWallets } = await WalletController.importWallets(network, parsedMnemonic);
            await SettingsStorage.set(defaultSettingsState);
            const isTestnet = network === Chains.TESTNET;
            await WalletStorage.setSecure({
                pin,
                mnemonic: parsedMnemonic,
                testnet: isTestnet ? newSecureWallets : [],
                mainnet: !isTestnet ? newSecureWallets : [],
            });
            await WalletStorage.setUnencryptedWallets(newStorageWallets, network);
            /**
             * Set state. Set wallet state must be the last one because if isAuthenticate becomes true
             * it will navigate to MainNavigatorGroup
             */
            setSettingsState(defaultSettingsState);
            setWalletState((state) => ({
                ...state,
                wallets: wallets,
                hasWallet: true,
                isAuthenticated: true,
                selectedWallet: 0,
            }));

            //After all clean createWalletState
            resetCreateWalletState();
        };
        setTimeout(setStorage, 2000); //TODO: Revise this timeout
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
