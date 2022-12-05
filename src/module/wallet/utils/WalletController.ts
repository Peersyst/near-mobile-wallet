import { NetworkType } from "module/settings/state/SettingsState";
import { Chains } from "near-peersyst-sdk";
import ServiceInstance from "../state/ServiceInstance/ServiceInstance";
import { Wallet } from "../state/WalletState";
import { SecureWalletInfo } from "../wallet.types";
import { WalletStorage } from "../WalletStorage";
import { WalletUtils } from "./WalletUtils";

interface WalletsControllerBaseReturn {
    wallets: Wallet[];
}

export default class WalletController {
    static async importWallets(
        network: NetworkType,
        pin?: string,
        mnemonic?: string,
        privateKeyParam?: string,
    ): Promise<WalletsControllerBaseReturn> {
        const wallets: Wallet[] = []; //Wallets to be added to the state
        const numOfPrevWallets = (await WalletStorage.getUnencryptedWallets(network)).length;
        const secureStorage = await WalletStorage.getSecure();
        const walletIds: SecureWalletInfo["walletIds"] = []; //Wallets to be added to the secure storage
        let privateKey = "";

        if ((mnemonic && secureStorage?.mnemonic === mnemonic) || secureStorage?.[network].find((w) => w.privateKey === privateKeyParam)) {
            return { wallets: [] };
        }

        //Init serviceInstanceMap
        const accounts = await ServiceInstance.createServiceInstance({
            network,
            privateKey: privateKeyParam,
            mnemonic: mnemonic,
        });

        for (const [index, { account, privateKey: pK }] of accounts.entries()) {
            /**
             * Don't used privateKeyParam because it can be undefined
             * and the wallet will be created with a privateKey derived from the mnemonic
             */
            if (index === 0) privateKey = pK;
            const newIndex = numOfPrevWallets + index;
            const wallet: Wallet = { account, index: newIndex, colorIndex: 0 };
            wallets.push(wallet);
            walletIds.push(newIndex);
        }

        if (pin && mnemonic) {
            //Store information in the storage
            const newSecureWallets = [{ privateKey, walletIds }];
            const isTestnet = network === Chains.TESTNET;
            //First app import
            await WalletStorage.setSecure({
                pin,
                mnemonic,
                testnet: isTestnet ? newSecureWallets : [],
                mainnet: !isTestnet ? newSecureWallets : [],
            });
        } else {
            //Import account with previous accounts
            await WalletStorage.setSecureWalletIds(walletIds, privateKey, network);
        }
        await WalletStorage.setUnencryptedWallets(wallets, network);

        return { wallets };
    }

    static async recoverWallets(network: NetworkType): Promise<WalletsControllerBaseReturn> {
        //Info about the wallets (that is set into the state)
        const oldStorageWallets = await WalletStorage.getWallets(network);
        //Has all the privateKeys and walletIds that point into the oldStorageWallets
        const walletGroups = await WalletStorage.getSecureWallets(network);

        //Does not have any previous wallet
        if (oldStorageWallets.length === 0 || walletGroups.length === 0) return { wallets: [] };

        const wallets: Wallet[] = []; //Wallets to be added to the state
        const newSecureWallets: SecureWalletInfo[] = []; //Wallets to be added to the secure storage
        let newWalletIndex = 0;

        for (const walletGroup of walletGroups) {
            //Get all the accounts from the private key
            const accounts = await ServiceInstance.addServiceInstances({
                network: network,
                privateKey: walletGroup.privateKey,
            });

            const tempWallets: Wallet[] = [];
            const newAccountIds: number[] = [];

            //For each walletId (same as index) corresponding to the private key
            //Same as for each prev account stored related to the private key
            for (const walletId of walletGroup.walletIds) {
                const wallet = WalletUtils.getWallet(walletId, oldStorageWallets);
                if (!wallet) {
                    /* eslint-disable no-console */
                    console.warn("Corrupted storage: Wallet not found. WalletId: ", walletId);

                    //Check that the account has not been deleted outside the app
                } else if (accounts.find((a) => a.account === wallet.account)) {
                    tempWallets.push({ ...wallet, colorIndex: 0, index: newWalletIndex });
                    newAccountIds.push(walletId);
                    newWalletIndex++;
                }
            }

            //New accounts created outside the app
            if (accounts.length > walletGroup.walletIds.length) {
                const newTempAccounts = accounts.filter(({ account }) => !tempWallets.find((w) => w.account === account));
                for (const { account } of newTempAccounts) {
                    const newWallet: Wallet = {
                        account,
                        index: newWalletIndex,
                        colorIndex: 0,
                    };
                    tempWallets.push(newWallet);
                    newAccountIds.push(newWallet.index);
                    newWalletIndex++;
                }
            }

            //Obs: newAccountIds.length < 0. All wallets related to the private key has been deleted
            if (newAccountIds.length > 0) {
                wallets.push(...tempWallets);
                newSecureWallets.push({ privateKey: walletGroup.privateKey, walletIds: newAccountIds });
            }
        }

        const shouldUpdateWallets = wallets.length !== oldStorageWallets.length;

        //Update the storage
        if (shouldUpdateWallets) await WalletStorage.setSecureWallets(newSecureWallets, network);
        if (shouldUpdateWallets) await WalletStorage.setUnencryptedWallets(wallets, network);
        return { wallets };
    }
}
