import { NetworkType } from "module/settings/state/SettingsState";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import ServiceInstances from "../state/ServiceInstances/ServiceInstances";
import { CreateInstanceReturn } from "../state/ServiceInstances/ServiceInstances.types";
import { Wallet } from "../state/WalletState";
import { SecureWalletInfo, UnencryptedWalletInfo } from "../wallet.types";
import { WalletStorage } from "../WalletStorage";
import { WalletUtils } from "./WalletUtils";

export interface WalletControllerBaseReturn {
    wallets: Wallet[];
}

export interface TempWalletGroup {
    deletedIds: number[];
    privateKey: string;
    newWallets: CreateInstanceReturn[];
}

export interface AddNewWalletsParams {
    newWalletGroups: TempWalletGroup[];
    secureWallets: SecureWalletInfo[];
    storageWallets: UnencryptedWalletInfo[];
    wallets: Wallet[];
    mainPrivateKey: string;
}

export interface UpdateWalletsReturn {
    updatedStorageWallets: UnencryptedWalletInfo[];
    updatedWallets: Wallet[];
    updatedSecureWallets: SecureWalletInfo[];
}

export interface GetWalletsParams {
    network: NetworkType;
    walletGroups: SecureWalletInfo[];
    mainPrivateKey: string;
    storageWallets: UnencryptedWalletInfo[];
}

export interface GetWalletsReturn {
    newWallets: Wallet[];
    newWalletGroups: TempWalletGroup[];
    deletedIds: number[];
}

export interface CheckWalletsReturn extends GetWalletsReturn {
    hasNewAccounts: boolean;
}

export default new (class WalletController {
    /**
     * Import a wallet from a private key or a mnemonic
     * @returns Returns the new wallets (not the previous ones)
     */
    async importWallets(
        network: NetworkType,
        pin?: string,
        mnemonic?: string,
        privateKeyParam?: string,
    ): Promise<WalletControllerBaseReturn> {
        /**
         * Get secure storage and check if has a mnemonic and if the pK/mnemonic is not repeated (already in storage)
         */
        const secureStorage = await WalletStorage.getSecure();

        if (
            (mnemonic && secureStorage?.mnemonic === mnemonic) ||
            (!mnemonic && secureStorage?.[network].find((w) => w.privateKey === privateKeyParam))
        ) {
            return { wallets: [] };
        }

        const storageWallets = await WalletStorage.getUnencryptedWallets(network);
        const numOfPrevWallets = storageWallets.length;
        const newWallets: Wallet[] = [];
        const walletIds: SecureWalletInfo["walletIds"] = []; //Wallets' ids to be added to the secure storage
        const imported = !mnemonic || !!secureStorage?.mnemonic;
        let privateKey = "";

        //Init serviceInstancesMap
        const accounts = await ServiceInstances.addServiceInstances({ network, privateKey: privateKeyParam, mnemonic });

        //Add new accounts
        for (const [index, { account, privateKey: pK }] of accounts.entries()) {
            /**
             * privateKeyParam is not used because it can be undefined
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
    async recoverWallets(network: NetworkType): Promise<WalletControllerBaseReturn> {
        const secureStorage = await WalletStorage.getSecure();
        //Info about the wallets (that is set into the state)
        const storageWallets = await WalletStorage.getWallets(network); //Sorted by index
        //Has all the privateKeys and walletIds that point into the oldStorageWallets
        const walletGroups = secureStorage?.[network] || [];

        //Does not have any previous wallet
        if (storageWallets.length === 0 || walletGroups.length === 0) return { wallets: [] };

        const mainPrivateKey = secureStorage?.mainPrivateKey || ""; //If has previous wallets, it has a mainPrivateKey

        const { newWallets, newWalletGroups, deletedIds, hasNewAccounts } = await this.checkWallets({
            network,
            walletGroups,
            mainPrivateKey,
            storageWallets,
        });

        const hasDeletedAccounts = deletedIds.length > 0;

        //No accounts created/deleted outside the app
        if (!hasDeletedAccounts && !hasNewAccounts) {
            return { wallets: newWallets };
        } else {
            let finalWallets: Wallet[] = [...newWallets];
            let finalWalletGroups: SecureWalletInfo[] = [...walletGroups];
            let finalStorageWallets: UnencryptedWalletInfo[] = [...storageWallets];
            //Delete wallets
            if (hasDeletedAccounts) {
                //Delete the wallets and update the wallet.index of secure and unencrypted wallets
                const { updatedSecureWallets, updatedStorageWallets, updatedWallets } = this.deleteRemovedWallets(
                    storageWallets,
                    newWallets,
                    walletGroups,
                    deletedIds,
                );
                finalWallets = [...updatedWallets];
                finalWalletGroups = [...updatedSecureWallets];
                finalStorageWallets = [...updatedStorageWallets];
            }

            //Add new wallets
            if (hasNewAccounts) {
                //Delete the wallets and update the wallet.index of secure and unencrypted wallets
                const { updatedSecureWallets, updatedStorageWallets, updatedWallets } = this.addNewWallets({
                    wallets: finalWallets,
                    secureWallets: finalWalletGroups,
                    storageWallets: finalStorageWallets,
                    mainPrivateKey,
                    newWalletGroups,
                });
                finalWallets = [...updatedWallets];
                finalWalletGroups = [...updatedSecureWallets];
                finalStorageWallets = [...updatedStorageWallets];
            }

            await WalletStorage.setSecureWallets(finalWalletGroups, network);
            await WalletStorage.setUnencryptedWallets(finalStorageWallets, network);
            return { wallets: finalWallets };
        }
    }

    /**
     * Get all the wallets. Check if has deleted wallets and if some new wallets has been created outside the app
     */
    private async checkWallets({ network, walletGroups, mainPrivateKey, storageWallets }: GetWalletsParams): Promise<CheckWalletsReturn> {
        const newWallets: Wallet[] = [];
        const newWalletGroups: TempWalletGroup[] = [];
        const deletedIds: number[] = [];
        let hasNewAccounts = false;

        for (const walletGroup of walletGroups) {
            const tempWallets: Wallet[] = [];
            const accountDeletedIds: number[] = [];

            //Get all the accounts from the private key
            const accounts = await ServiceInstances.addServiceInstances({ network: network, privateKey: walletGroup.privateKey });
            const imported = walletGroup.privateKey !== mainPrivateKey;
            //Recover the old accounts and check if there are deleted accounts
            for (const walletId of walletGroup.walletIds) {
                const wallet = WalletUtils.getWallet(walletId, storageWallets);
                if (!wallet) {
                    /* eslint-disable no-console */
                    console.warn("Corrupted storage: Wallet not found. WalletId: ", walletId);
                    deletedIds.push(walletId);
                    accountDeletedIds.push(walletId);
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
            const newTempAccounts = accounts.filter(({ account }) => !tempWallets.find((w) => w.account === account));
            if (newTempAccounts.length > 0) hasNewAccounts = true;
            newWalletGroups.push({ deletedIds: accountDeletedIds, newWallets: newTempAccounts, privateKey: walletGroup.privateKey });
        }

        return {
            newWallets,
            newWalletGroups,
            deletedIds,
            hasNewAccounts,
        };
    }

    /**
     * Adds new wallets to the variables not to the storage
     */
    private addNewWallets({
        newWalletGroups,
        secureWallets,
        storageWallets,
        wallets,
        mainPrivateKey,
    }: AddNewWalletsParams): UpdateWalletsReturn {
        const updatedWallets: Wallet[] = [...wallets];
        let updatedSecureWallets: SecureWalletInfo[] = [...secureWallets];
        const updatedStorageWallets: UnencryptedWalletInfo[] = [...storageWallets];

        for (const walletGroup of newWalletGroups) {
            //Check if the walletGroup already exists (maybe had all their previous accounts deleted)
            const oldWalletGroup = updatedSecureWallets.find(({ privateKey }) => privateKey === walletGroup.privateKey);
            const finalIds: number[] = oldWalletGroup?.walletIds || [];
            const imported = walletGroup.privateKey !== mainPrivateKey;
            //Add new accounts
            for (const { account } of walletGroup.newWallets) {
                const newIndex = updatedStorageWallets.length;
                const newBaseWallet: UnencryptedWalletInfo = { account, index: newIndex };
                updatedStorageWallets.push(newBaseWallet);
                updatedWallets.push({
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
                    const tempSecureWallets = updatedSecureWallets.filter(({ privateKey }) => privateKey !== walletGroup.privateKey);
                    updatedSecureWallets = [...tempSecureWallets, newWalletGroup];
                } else {
                    //If the walletGroup does not exist, create it
                    updatedSecureWallets.push(newWalletGroup);
                }
            }
        }
        return {
            updatedStorageWallets,
            updatedWallets,
            updatedSecureWallets,
        };
    }

    /**
     * Delete the wallets from the variables not from storage
     */
    private deleteRemovedWallets(
        storageWallets: UnencryptedWalletInfo[],
        wallets: Wallet[],
        walletGroups: SecureWalletInfo[],
        deletedIds: number[],
    ): UpdateWalletsReturn {
        const sortedDeletedIds = deletedIds.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });
        let currentDeletedIndex = 0;
        const newIndexNumberMap = new Map<number, number>();
        const updatedStorageWallets: UnencryptedWalletInfo[] = [];
        const updatedWallets: Wallet[] = [];
        const updatedSecureWallets: SecureWalletInfo[] = [];

        for (const storageWallet of storageWallets) {
            if (currentDeletedIndex < sortedDeletedIds.length && sortedDeletedIds[currentDeletedIndex] === storageWallet.index) {
                currentDeletedIndex++;
            } else {
                const newIndex = storageWallet.index - currentDeletedIndex;
                newIndexNumberMap.set(storageWallet.index, newIndex);
                updatedStorageWallets.push({ ...storageWallet, index: newIndex });
                const wallet = WalletUtils.getWallet(storageWallet.index, wallets);
                if (wallet) updatedWallets.push({ ...wallet, index: newIndex });
            }
        }
        for (const walletGroup of walletGroups) {
            const finalIds: number[] = [];
            for (const walletId of walletGroup.walletIds) {
                const newIndex = newIndexNumberMap.get(walletId);
                if (newIndex !== undefined) finalIds.push(newIndex);
            }
            if (finalIds.length > 0) updatedSecureWallets.push({ privateKey: walletGroup.privateKey, walletIds: finalIds });
        }
        return { updatedStorageWallets, updatedWallets, updatedSecureWallets };
    }

    /**
     * Create new account:
     * - Set the new account in the wallet state
     * - Set the new account with its pK in the storage
     * - Set a new service instance with the new account
     */
    async createNewWallet(
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
        ServiceInstances.addService({ service: newService, network });

        return {
            account: newAccount,
            index: newIndex,
            colorIndex: WalletUtils.getWalletColor(newAccount),
            ...(imported && { imported }),
        };
    }
})();
