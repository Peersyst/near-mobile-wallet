import { NetworkType } from "module/settings/state/SettingsState";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import ServiceInstances from "../state/ServiceInstances/ServiceInstances";
import { RecoverInstancesReturn } from "../state/ServiceInstances/ServiceInstances.types";
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
    newWallets: RecoverInstancesReturn[];
}

export interface AddNewWalletsParams {
    newWalletGroups: TempWalletGroup[];
    secureWallets: SecureWalletInfo[];
    storageWallets: UnencryptedWalletInfo[];
    wallets: Wallet[];
    mainPrivateKey: string;
    network: NetworkType;
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

export interface ImportAccountManuallyReturn {
    canImport?: boolean;
    alreadyImported?: boolean;
    wallet?: Wallet;
}

export default new (class WalletController {
    private isSameSecretKey(secretKey1: string, secretKey2: string) {
        return NearSDKService.isSameSecretKey(secretKey1, secretKey2);
    }

    private isImported(secretKey1?: string, secretKey2?: string) {
        return !!secretKey1 && !!secretKey2 && !this.isSameSecretKey(secretKey1, secretKey2);
    }

    private parsePrivateKey(privateKey: string) {
        return NearSDKService.parsePrivateKey(privateKey);
    }

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
            (!mnemonic && privateKeyParam && secureStorage?.[network].find((w) => this.isSameSecretKey(w.privateKey, privateKeyParam)))
        ) {
            return { wallets: [] };
        }

        const storageWallets = await WalletStorage.getUnencryptedWallets(network);
        const numOfPrevWallets = storageWallets.length;
        const newWallets: Wallet[] = [];
        const walletIds: SecureWalletInfo["walletIds"] = []; //Wallets' ids to be added to the secure storage
        let privateKey = "";
        const finalPrivateKeyParam = privateKeyParam ? this.parsePrivateKey(privateKeyParam) : undefined;

        const imported: boolean =
            (!!mnemonic && !!secureStorage?.mnemonic) ||
            (!!secureStorage?.mainPrivateKey && this.isImported(secureStorage.mainPrivateKey, finalPrivateKeyParam));

        //Init serviceInstancesMap
        const likelyNameIds = await WalletStorage.getAccountsFromPrivateKey(privateKey, network);
        const accounts = await ServiceInstances.addServiceInstances({ network, privateKey: finalPrivateKeyParam, mnemonic, likelyNameIds });

        //Add new accounts
        for (const [index, { account, privateKey: pK }] of accounts.entries()) {
            /**
             * privateKeyParam is not used because it can be undefined
             * and in that case the wallet will create a privateKey derived from the mnemonic
             */
            if (index === 0) {
                if (storageWallets.length > 0) {
                    const repeatedPrivateKey = secureStorage?.[network].find((w) => this.isSameSecretKey(w.privateKey, pK));
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

        const parsedPrivateKey = this.parsePrivateKey(privateKey);
        //Store information in the secure storage
        if (pin && mnemonic) {
            const newSecureWallets = [{ privateKey: parsedPrivateKey, walletIds }];
            const isTestnet = network === Chains.TESTNET;
            //First app import
            await WalletStorage.setSecure({
                pin,
                mnemonic,
                mainPrivateKey: parsedPrivateKey,
                testnet: isTestnet ? newSecureWallets : [],
                mainnet: !isTestnet ? newSecureWallets : [],
            });
        } else {
            //Import account with previous accounts
            await WalletStorage.setSecureWalletIds(walletIds, parsedPrivateKey, network);
        }

        //Store information in the unencrypted storage
        await WalletStorage.setUnencryptedWallets(storageWallets, network);

        return { wallets: newWallets };
    }

    /**
     *
     */
    async getMainPrivateKey(): Promise<string | undefined> {
        const secureStorage = await WalletStorage.getSecure();
        return secureStorage?.mainPrivateKey;
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

        const mainPrivateKey = this.parsePrivateKey(secureStorage?.mainPrivateKey || ""); //If has previous wallets, it has a mainPrivateKey

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
                    network,
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
     * Checks if there are wallets for the given network
     * @returns A boolean indicating if there are wallets for the given network
     */
    public async hasWallets(network: NetworkType): Promise<boolean> {
        const { wallets } = await this.recoverWallets(network);

        return wallets.length > 0;
    }

    /**
     * Checks if there is a mnemonic
     * @returns A boolean indicating if there is a mnemonic
     */
    public async hasMnemonic(): Promise<boolean> {
        const mnemonic = await WalletStorage.getMnemonic();

        return !!mnemonic;
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
            const parsedPrivateKey = this.parsePrivateKey(walletGroup.privateKey);
            //Get all the accounts from the private key
            const likelyNameIds = await WalletStorage.getAccountsFromPrivateKey(parsedPrivateKey, network);
            const accounts = await ServiceInstances.recoverServiceInstances({
                network: network,
                likelyNameIds,
                privateKey: parsedPrivateKey,
            });
            const imported = this.isImported(parsedPrivateKey, mainPrivateKey);
            //Recover the old accounts and check if there are deleted accounts
            for (const walletId of walletGroup.walletIds) {
                const wallet = WalletUtils.getWallet(walletId, storageWallets);
                if (!wallet) {
                    /* eslint-disable no-console */
                    console.warn("Corrupted storage: Wallet not found. WalletId: ", walletId);
                    deletedIds.push(walletId);
                    accountDeletedIds.push(walletId);
                } else {
                    const account = accounts.find((a) => a.account === wallet.account);
                    if (account) {
                        const newWallet = {
                            ...wallet,
                            colorIndex: WalletUtils.getWalletColor(wallet.account),
                            ...(imported && { imported: true }),
                        };
                        newWallets[wallet.index] = newWallet;
                        tempWallets.push(newWallet);
                        ServiceInstances.setService({ network, service: account.service, serviceIndex: wallet.index });
                    } else {
                        deletedIds.push(walletId);
                        accountDeletedIds.push(walletId);
                    }
                }
            }
            const newTempAccounts = accounts.filter(({ account }) => !tempWallets.find((w) => w.account === account));
            if (newTempAccounts.length > 0) hasNewAccounts = true;

            newWalletGroups.push({ deletedIds: accountDeletedIds, newWallets: newTempAccounts, privateKey: parsedPrivateKey });
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
        network,
        mainPrivateKey,
    }: AddNewWalletsParams): UpdateWalletsReturn {
        const updatedWallets: Wallet[] = [...wallets];
        let updatedSecureWallets: SecureWalletInfo[] = [...secureWallets];
        const updatedStorageWallets: UnencryptedWalletInfo[] = [...storageWallets];

        for (const walletGroup of newWalletGroups) {
            const parsedPrivateKey = this.parsePrivateKey(walletGroup.privateKey);

            //Check if the walletGroup already exists (maybe had all their previous accounts deleted)
            const oldWalletGroup = updatedSecureWallets.find(({ privateKey }) => this.isSameSecretKey(privateKey, walletGroup.privateKey));
            const finalIds: number[] = oldWalletGroup?.walletIds || [];
            const imported = this.isImported(parsedPrivateKey, mainPrivateKey);
            //Add new accounts
            for (const { account, service } of walletGroup.newWallets) {
                const newIndex = updatedStorageWallets.length;
                const newBaseWallet: UnencryptedWalletInfo = { account, index: newIndex };
                updatedStorageWallets.push(newBaseWallet);
                updatedWallets.push({
                    ...newBaseWallet,
                    colorIndex: WalletUtils.getWalletColor(account),
                    ...(imported && { imported }),
                });
                finalIds.push(newIndex);
                //Add new service
                ServiceInstances.addService({ service, network });
            }

            //Update the secure storage with the new accounts
            if (finalIds.length > 0) {
                const newWalletGroup = { privateKey: parsedPrivateKey, walletIds: finalIds };
                if (oldWalletGroup) {
                    //If the walletGroup already exists, update it
                    const tempSecureWallets = updatedSecureWallets.filter(
                        ({ privateKey }) => !this.isSameSecretKey(privateKey, parsedPrivateKey),
                    );
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
            updatedSecureWallets.push({ privateKey: this.parsePrivateKey(walletGroup.privateKey), walletIds: finalIds });
        }
        return { updatedStorageWallets, updatedWallets, updatedSecureWallets };
    }

    /**
     * Create new account:
     * - Set the new account in the wallet state
     * - Set the new account with its pK in the storage
     * - Set a new service instance with the new account
     */
    async createNewWallet(newAccount: string, newService: NearSDKService, network: NetworkType): Promise<Wallet | undefined> {
        const [newIndex, mainPrivateKey] = await Promise.all([
            await WalletStorage.addNewUnencryptedWallet({ account: newAccount }, network),
            await WalletStorage.getMainPrivateKey(),
        ]);

        if (mainPrivateKey === undefined || newIndex === undefined) return undefined;

        const imported = this.isImported(newService.getSecretKey(), mainPrivateKey);

        const newSecret = this.parsePrivateKey(newService.getSecretKey());

        await WalletStorage.setSecureWalletId(newIndex, newSecret, network);
        ServiceInstances.addService({ service: newService, network });

        return {
            account: newAccount,
            index: newIndex,
            colorIndex: WalletUtils.getWalletColor(newAccount),
            ...(imported && { imported }),
        };
    }

    async importAccountManually(account: string, accessKeys: string[], network: NetworkType): Promise<ImportAccountManuallyReturn> {
        //Check if the some of the account's accessKeys are in the secure storage
        const walletGroups = await WalletStorage.getSecureWallets(network);
        const secureWallet = walletGroups.find((walletGroup) => {
            const publicKey = NearSDKService.getPublicKeyFromSecretKey(walletGroup.privateKey);
            return accessKeys.includes(publicKey);
        });
        if (!secureWallet) return { canImport: false };

        //Check if the account is already in the unencrypted storage
        const wallets = await WalletStorage.getUnencryptedWallets(network);
        for (const walletId of secureWallet.walletIds) {
            const wallet = wallets.find((w) => w.index === walletId);
            if (wallet && wallet.account === account) {
                return { alreadyImported: true };
            }
        }

        //Create new ServiceInstance
        await ServiceInstances.addManualServiceInstance({
            network,
            secretKey: secureWallet.privateKey,
            accountId: account,
        });

        //Add new wallet to the storage
        const isImported = this.isImported(secureWallet.privateKey, await WalletStorage.getMainPrivateKey());
        const newIndex = await WalletStorage.addNewUnencryptedWallet({ account }, network);
        if (newIndex === undefined) return { canImport: false };

        //Add new wallet to the secure storage
        await WalletStorage.setSecureWalletId(newIndex, secureWallet.privateKey, network);

        const newWallet: Wallet = {
            account,
            index: newIndex,
            colorIndex: WalletUtils.getWalletColor(account),
            ...(isImported && { imported: true }),
        };

        return { wallet: newWallet, canImport: true };
    }
})();
