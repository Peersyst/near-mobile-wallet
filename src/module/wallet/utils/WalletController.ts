import { NetworkType } from "module/settings/state/SettingsState";
import ServiceInstance from "../state/ServiceInstance/ServiceInstance";
import { Wallet } from "../state/WalletState";
import { StorageWallet, SecureWalletInfo } from "../wallet.types";
import { getWallet } from "./wallet.utils";

interface ImportWalletsReturn {
    wallets: Wallet[];
    newStorageWallets: StorageWallet[];
    newSecureWallets: SecureWalletInfo[];
}

interface RecoverWalletsReturn extends ImportWalletsReturn {
    updateSecure: boolean;
}

export default class WalletController {
    static async importWallets(network: NetworkType, mnemonic: string): Promise<ImportWalletsReturn> {
        const wallets: Wallet[] = []; //Wallets to be added to the state
        const newStorageWallets: StorageWallet[] = []; //Wallets to be added to the storage
        const walletIds: SecureWalletInfo["walletIds"] = []; //Wallets to be added to the secure storage
        let privateKey: string = "";

        //Init serviceInstanceMap
        const accounts = await ServiceInstance.createServiceInstance({ mnemonic, network });
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
        const newSecureWallets = [
            {
                privateKey,
                walletIds,
            },
        ];
        return { wallets, newStorageWallets, newSecureWallets };
    }

    static async recoverWallets(
        network: NetworkType,
        oldStorageWallets: StorageWallet[],
        walletGroups: SecureWalletInfo[],
    ): Promise<RecoverWalletsReturn> {
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
        return { wallets, newStorageWallets, newSecureWallets, updateSecure };
    }
}
