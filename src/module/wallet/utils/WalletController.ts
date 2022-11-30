import { NetworkType } from "module/settings/state/SettingsState";
import { Chains } from "near-peersyst-sdk";
import ServiceInstance from "../state/ServiceInstance/ServiceInstance";
import { Wallet } from "../state/WalletState";
import { StorageWallet, SecureWalletInfo } from "../wallet.types";
import { WalletStorage } from "../WalletStorage";
import { getWallet } from "./wallet.utils";

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
        const newStorageWallets: StorageWallet[] = []; //Wallets to be added to the storage
        const walletIds: SecureWalletInfo["walletIds"] = []; //Wallets to be added to the secure storage
        let privateKey: string = "";

        //Init serviceInstanceMap
        const accounts = await ServiceInstance.createServiceInstance({
            network,
            privateKey: privateKeyParam,
            mnemonic: privateKeyParam ? undefined : mnemonic,
        });

        for (const [index, { account, privateKey: pK }] of accounts.entries()) {
            if (index === 0) privateKey = pK;
            const wallet: Wallet = { account, colorIndex: 0 };
            wallets.push(wallet);
            walletIds.push(index);
            newStorageWallets.push({ ...wallet, index });
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
        await WalletStorage.setUnencryptedWallets(newStorageWallets, network);

        return { wallets };
    }

    static async recoverWallets(network: NetworkType): Promise<WalletsControllerBaseReturn> {
        //Info about the wallets (that is set into the state)
        const oldStorageWallets = await WalletStorage.getWallets(network);
        //Has all the privateKeys and walletIds that point into the oldStorageWallets
        const walletGroups = await WalletStorage.getSecureWallets(network);

        if (oldStorageWallets.length === 0 || walletGroups.length === 0) return { wallets: [] };

        const wallets: Wallet[] = []; //Wallets to be added to the state
        const newStorageWallets: StorageWallet[] = [...oldStorageWallets]; //Wallets to be added to the storage
        const newSecureWallets: SecureWalletInfo[] = [...walletGroups]; //Wallets to be added to the secure storage
        let updateSecure = false;

        for (const [index, walletGroup] of walletGroups.entries()) {
            const accounts = await ServiceInstance.addServiceInstances({
                network: network,
                privateKey: walletGroup.privateKey,
            });

            const tempWallets: Wallet[] = [];
            const tempStorageWallets: StorageWallet[] = [];

            for (const walletId of walletGroup.walletIds) {
                const wallet = getWallet(walletId, oldStorageWallets);
                if (wallet) {
                    tempWallets.push(wallet);
                } else {
                    console.warn("Corrupted storage: Wallet not found. WalletId: ", walletId);
                }
            }
            //New accounts created outside the app
            if (walletGroup.walletIds.length !== accounts.length) {
                const newAccounts = accounts.filter(({ account }) => !tempWallets.find((w) => w.account === account));
                for (const { account } of newAccounts) {
                    const wallet: Wallet = {
                        colorIndex: 0,
                        account,
                    };
                    const newIndex = wallets.length + tempWallets.length;
                    tempWallets.push(wallet);
                    tempStorageWallets.push({ ...wallet, index: newIndex });
                    newSecureWallets[index].walletIds = [...walletGroup.walletIds, newIndex];
                    updateSecure = true;
                }
            }
            wallets.push(...tempWallets);
            newStorageWallets.push(...tempStorageWallets);
        }
        //Update the storage
        if (updateSecure) await WalletStorage.setSecureWallets(newSecureWallets, network);
        if (newStorageWallets.length !== oldStorageWallets.length) await WalletStorage.setUnencryptedWallets(newStorageWallets, network);
        return { wallets };
    }
}
