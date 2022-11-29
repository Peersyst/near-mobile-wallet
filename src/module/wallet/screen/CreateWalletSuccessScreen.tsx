import { useEffect } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import walletState, { Wallet } from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import ServiceInstance from "../state/ServiceInstance/ServiceInstance";
import { SecureWalletInfo, StorageWallet } from "../wallet.types";
import { Chains } from "near-peersyst-sdk";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const {
        state: { mnemonic, pin },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);
    const [{ network }, setSettingsState] = useRecoilState(settingsState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);

    useEffect(() => {
        const setStorage = async () => {
            const wallets: Wallet[] = []; //Wallets to be added to the state
            const newStorageWallets: StorageWallet[] = []; //Wallets to be added to the storage
            const walletIds: SecureWalletInfo["walletIds"] = []; //Wallets to be added to the secure storage
            let privateKey: string = "";
            const parsedMnemonic = mnemonic?.join(" ")!;

            //Init serviceInstanceMap
            const accounts = await ServiceInstance.createServiceInstance({ mnemonic: parsedMnemonic, network });
            for (const [index, { account, privateKey: pK }] of accounts.entries()) {
                if (index === 0) privateKey = pK;
                const wallet: Wallet = {
                    account,
                    colorIndex: 0,
                };
                wallets.push(wallet);
                walletIds.push(index);
                newStorageWallets.push({
                    ...wallet,
                    index,
                });
            }

            //Store information in the storage
            const newSecureStorageWallet: SecureWalletInfo = {
                privateKey,
                walletIds,
            };
            await SettingsStorage.set(defaultSettingsState);
            const isTestnet = network === Chains.TESTNET;
            await WalletStorage.setSecure({
                pin,
                mnemonic: parsedMnemonic,
                testnet: isTestnet ? [newSecureStorageWallet] : [],
                mainnet: !isTestnet ? [newSecureStorageWallet] : [],
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
        setTimeout(setStorage, 2000);
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
