import { NetworkType } from "module/settings/state/SettingsState";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import ServiceInstance from "../state/ServiceInstance/ServiceInstance";
import { CreateInstanceReturn } from "../state/ServiceInstance/ServiceInstance.types";
import { Wallet } from "../state/WalletState";
import { SecureWalletInfo, UnencryptedWalletInfo } from "../wallet.types";
import { WalletStorage } from "../WalletStorage";
import { WalletUtils } from "./WalletUtils";

interface WalletsControllerBaseReturn {
    wallets: Wallet[];
}

interface TempWalletGroup {
    deletedIds: number[];
    privateKey: string;
    newWallets: CreateInstanceReturn[];
}

export default class WalletController {
    /**
     * Import a wallet from a private key or a mnemonic
     * @returns Returns the new wallets and if the secret is repeated
     */
    static async importWallets(
        network: NetworkType,
        pin?: string,
        mnemonic?: string,
        privateKeyParam?: string,
    ): Promise<WalletsControllerBaseReturn> {
        const storageWallets = await WalletStorage.getUnencryptedWallets(network);
        const newWallets: Wallet[] = [];
        const secureStorage = await WalletStorage.getSecure();
        const walletIds: SecureWalletInfo["walletIds"] = []; //Wallets to be added to the secure storage

        let privateKey = "";

        if ((mnemonic && secureStorage?.mnemonic === mnemonic) || secureStorage?.[network].find((w) => w.privateKey === privateKeyParam)) {
            return { wallets: [] };
        }

        const imported = !mnemonic || (secureStorage?.mnemonic && mnemonic !== secureStorage?.mnemonic);

        //Init serviceInstanceMap
        const accounts = await ServiceInstance.addServiceInstances({ network, privateKey: privateKeyParam, mnemonic });
        const numOfPrevWallets = storageWallets.length;

        //Add new accounts
        for (const [index, { account, privateKey: pK }] of accounts.entries()) {
            /**
             * Don't used privateKeyParam because it can be undefined
             * and in that case the wallet will create a privateKey derived from the mnemonic
             */
            if (index === 0) {
                if (storageWallets.length > 0) {
                    const repeatedPrivateKey = secureStorage?.[network].find((w) => w.privateKey === pK);
                    if (repeatedPrivateKey) {
                        //The account already exists
                        return { wallets: [] };
                    }
                }
                privateKey = pK;
            }
            const newIndex = numOfPrevWallets + index;
            const baseWallet: UnencryptedWalletInfo = { account, index: newIndex };
            storageWallets.push(baseWallet);
            newWallets.push({ ...baseWallet, colorIndex: WalletUtils.getWalletColor(account), ...(imported && { imported }) });
            walletIds.push(newIndex);
        }

        //Store information in the secure storage
        if (pin && mnemonic) {
            const newSecureWallets = [{ privateKey, walletIds }];
            const isTestnet = network === Chains.TESTNET;
            //First app import
            await WalletStorage.setSecure({
                pin,
                mnemonic,
                mainPrivateKey: privateKey,
                testnet: isTestnet ? newSecureWallets : [],
                mainnet: !isTestnet ? newSecureWallets : [],
            });
        } else {
            //Import account with previous accounts
            await WalletStorage.setSecureWalletIds(walletIds, privateKey, network);
        }

        //Store information in the unencrypted storage
        await WalletStorage.setUnencryptedWallets(storageWallets, network);

        return { wallets: newWallets };
    }

    /**
     * Recovers the wallets corresponding to the mnemonic or the privateKeys stored in the secure storage
     * Observations:
     * - Some new wallets can be created outside the app
     * - Some wallets can be deleted outside the app
     * @returns The recovered wallets
     */
    static async recoverWallets(network: NetworkType): Promise<WalletsControllerBaseReturn> {
        const secureStorage = await WalletStorage.getSecure();
        //Info about the wallets (that is set into the state)
        const oldStorageWallets = await WalletStorage.getWallets(network); //Sorted by index
        //Has all the privateKeys and walletIds that point into the oldStorageWallets
        const oldWalletGroups = secureStorage?.[network] || [];
        const mainPrivateKey = secureStorage?.mainPrivateKey || ""; //If has previous wallets, it has a mainPrivateKey

        const newWallets: Wallet[] = [];
        let numberOfNewAccounts = 0;
        const newWalletGroups: TempWalletGroup[] = [];
        const deletedIds: number[] = [];

        //Does not have any previous wallet
        if (oldStorageWallets.length === 0 || oldWalletGroups.length === 0) return { wallets: [] };

        for (const walletGroup of oldWalletGroups) {
            const tempWallets: Wallet[] = [];
            const accountDeletedIds: number[] = [];

            //Get all the accounts from the private key
            const accounts = await ServiceInstance.addServiceInstances({ network: network, privateKey: walletGroup.privateKey });
            const imported = walletGroup.privateKey !== mainPrivateKey;
            //Recover the old accounts and check if there are deleted accounts
            for (const walletId of walletGroup.walletIds) {
                const wallet = WalletUtils.getWallet(walletId, oldStorageWallets);
                if (!wallet) {
                    /* eslint-disable no-console */
                    console.warn("Corrupted storage: Wallet not found. WalletId: ", walletId);
                } else if (accounts.find((a) => a.account === wallet.account)) {
                    const newWallet = {
                        ...wallet,
                        colorIndex: WalletUtils.getWalletColor(wallet.account),
                        ...(imported && { imported: true }),
                    };
                    newWallets[wallet.index] = newWallet;
                    tempWallets.push(newWallet);
                } else {
                    deletedIds.push(walletId);
                    accountDeletedIds.push(walletId);
                }
            }

            //Check if there are new accounts
            const newTempAccounts = accounts.filter(({ account }) => !tempWallets.find((w) => w.account === account));
            numberOfNewAccounts += newTempAccounts.length;
            newWalletGroups.push({ deletedIds: accountDeletedIds, newWallets: newTempAccounts, privateKey: walletGroup.privateKey });
        }

        const numberOfDeletedWallets = deletedIds.length;

        //No accounts created/deleted outside the app
        if (numberOfDeletedWallets === 0 && numberOfNewAccounts === 0) {
            return { wallets: newWallets };
        } else {
            //There are new accounts or some has been deleted
            let finalSecureWallets: SecureWalletInfo[] = [...oldWalletGroups];
            let finalStorageWallets: UnencryptedWalletInfo[] = [...oldStorageWallets];
            let finalWallets: Wallet[] = [...newWallets];

            //Delete wallets
            if (numberOfDeletedWallets > 0) {
                //Delete the wallets and update the wallet.index of secure and unencrypted wallets
                const { newFinalWallets, newSecureWallets, newStorageWallets } = this.deletedWallets(
                    oldStorageWallets,
                    newWallets,
                    oldWalletGroups,
                    deletedIds,
                );
                finalSecureWallets = [...newSecureWallets];
                finalStorageWallets = [...newStorageWallets];
                finalWallets = [...newFinalWallets];
            }

            //Add new wallets
            if (numberOfNewAccounts > 0) {
                for (const walletGroup of newWalletGroups) {
                    //Check if the walletGroup already exists (maybe had all their previous accounts deleted)
                    const oldWalletGroup = finalSecureWallets.find(({ privateKey }) => privateKey === walletGroup.privateKey);
                    const finalIds: number[] = oldWalletGroup?.walletIds || [];
                    const imported = walletGroup.privateKey !== mainPrivateKey;
                    //Add new accounts
                    for (const { account } of walletGroup.newWallets) {
                        const newIndex = finalStorageWallets.length;
                        const newBaseWallet: UnencryptedWalletInfo = { account, index: newIndex };
                        finalStorageWallets.push(newBaseWallet);
                        finalWallets.push({
                            ...newBaseWallet,
                            colorIndex: WalletUtils.getWalletColor(account),
                            ...(imported && { imported }),
                        });
                        finalIds.push(newIndex);
                    }
                    //Update the secure storage with the new accounts
                    if (finalIds.length > 0) {
                        const newWalletGroup = { privateKey: walletGroup.privateKey, walletIds: finalIds };
                        if (oldWalletGroup) {
                            //If the walletGroup already exists, update it
                            const tempSecureWallets = finalSecureWallets.filter(({ privateKey }) => privateKey !== walletGroup.privateKey);
                            finalSecureWallets = [...tempSecureWallets, newWalletGroup];
                        } else {
                            //If the walletGroup does not exist, create it
                            finalSecureWallets.push(newWalletGroup);
                        }
                    }
                }
            }

            await WalletStorage.setSecureWallets(finalSecureWallets, network);
            await WalletStorage.setUnencryptedWallets(finalStorageWallets, network);
            return { wallets: finalWallets };
        }
    }

    static deletedWallets(
        storageWallets: UnencryptedWalletInfo[],
        wallets: Wallet[],
        walletGroups: SecureWalletInfo[],
        deletedIds: number[],
    ) {
        const sortedDeletedIds = deletedIds.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });
        let currentDeletedIndex = 0;
        const newIndexNumberMap = new Map<number, number>();
        const newStorageWallets: UnencryptedWalletInfo[] = [];
        const newFinalWallets: Wallet[] = [];
        const newSecureWallets: SecureWalletInfo[] = [];

        for (const storageWallet of storageWallets) {
            if (currentDeletedIndex < sortedDeletedIds.length && sortedDeletedIds[currentDeletedIndex] === storageWallet.index) {
                currentDeletedIndex++;
                continue;
            } else {
                const newIndex = storageWallet.index - currentDeletedIndex;
                newIndexNumberMap.set(storageWallet.index, newIndex);
                newStorageWallets.push({ ...storageWallet, index: newIndex });
                const wallet = WalletUtils.getWallet(storageWallet.index, wallets);
                if (wallet) newFinalWallets.push({ ...wallet, index: newIndex });
            }
        }
        for (const walletGroup of walletGroups) {
            const finalIds: number[] = [];
            for (const walletId of walletGroup.walletIds) {
                const newIndex = newIndexNumberMap.get(walletId);
                if (newIndex !== undefined) finalIds.push(newIndex);
            }
            if (finalIds.length > 0) newSecureWallets.push({ privateKey: walletGroup.privateKey, walletIds: finalIds });
        }
        return { newStorageWallets, newFinalWallets, newSecureWallets };
    }

    /**
     * Create new account:
     * - Set the new account in the wallet state
     * - Set the new account with its pK in the storage
     * - Set a new service instance with the new account
     */
    static async createNewWallet(
        newAccount: string,
        oldWalletIndex: number,
        newService: NearSDKService,
        network: NetworkType,
    ): Promise<Wallet | undefined> {
        const [walletGroupAndImported, newIndex] = await Promise.all([
            await WalletStorage.getSecureWalletGroupAndMainPrivateKey(oldWalletIndex, network),
            await WalletStorage.addNewUnencryptedWallet({ account: newAccount }, network),
        ]);
        if (newIndex === undefined || walletGroupAndImported?.walletGroup === undefined) return undefined;
        const { walletGroup, imported } = walletGroupAndImported;
        await WalletStorage.setSecureWalletId(newIndex, walletGroup.privateKey, network);
        ServiceInstance.addService({ service: newService, network });
        return {
            account: newAccount,
            index: newIndex,
            colorIndex: WalletUtils.getWalletColor(newAccount),
            ...(imported && { imported }),
        };
    }

    static async recoverWalletFromStorage(network: NetworkType) {
        const storageWallets = await WalletStorage.getUnencryptedWallets(network);
        const wallets: Wallet[] = [];
        for (const wallet of storageWallets) {
            wallets.push({
                ...wallet,
                colorIndex: WalletUtils.getWalletColor(wallet.account),
            });
        }
        return wallets;
    }
}
