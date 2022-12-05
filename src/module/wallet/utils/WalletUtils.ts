import { BaseWallet, SecureWalletInfo, UnencryptedWalletInfo } from "../wallet.types";

export class WalletUtils {
    //Base wallet methods
    static setWallet<W extends BaseWallet>(wallets: W[], wallet: W, index: number): W[] {
        return wallets.map((w) => {
            if (w.index !== index) return w;
            else return wallet;
        });
    }
    static getWallet<W extends BaseWallet>(index: number, wallets?: W[]): W | undefined {
        if (!wallets) return undefined;
        if (wallets[index].index === index) return wallets[index]; //Avoid filtering if they are in order
        return wallets.find((wallet) => wallet.index === index);
    }

    static deleteWallet<W extends BaseWallet>(wallets: W[], index: number): W[] {
        return wallets
            .filter((wallet) => wallet.index !== index)
            .map((wallet) => (wallet.index > index ? { ...wallet, index: wallet.index - 1 } : wallet));
    }

    static orderWallets<W extends BaseWallet>(wallets: W[]): W[] {
        return wallets.sort((a, b) => a.index - b.index);
    }

    //Uncommited transaction hashes methods
    static updateUncommitedTransactionHashes<W extends UnencryptedWalletInfo>(wallet: W, uncommittedTransactionHashes: string[]): W {
        return {
            ...wallet,
            uncommittedTransactionHashes,
        };
    }
    static updateWalletUncommittedTxHashes<W extends UnencryptedWalletInfo>(wallets: W[], hashes: string[], walletIndex: number): W[] {
        return wallets.map((w, index) => {
            if (index !== walletIndex) return w;
            else {
                return this.updateUncommitedTransactionHashes(w, hashes);
            }
        });
    }
    static removeWalletUncommittedTxHash(wallets: UnencryptedWalletInfo[], walletIndex: number, hash: string): UnencryptedWalletInfo[] {
        return wallets.map((w, index) => {
            if (index !== walletIndex) return w;
            else {
                const newHashes = w.uncommittedTransactionHashes?.filter((h) => h !== hash) || [];
                return this.updateUncommitedTransactionHashes(w, newHashes);
            }
        });
    }

    //Color methods
    static getWalletColor(account: string): number {
        //TODO: Implement this
        return (account.split("").pop()?.charCodeAt(0) || 0) % 3;
    }

    //Secure wallet methods
    static deleteWalletFromPrivateKey(privateKey: string, wallets: SecureWalletInfo[]): SecureWalletInfo[] {
        return wallets.filter((wallet) => wallet.privateKey !== privateKey);
    }

    static filterWalletId(walletId: number, walletIds: SecureWalletInfo["walletIds"]): SecureWalletInfo["walletIds"] {
        return walletIds.filter((id) => id !== walletId);
    }

    static deleteWalletId(walletIdToBeDeleted: number, wallets: SecureWalletInfo[]): SecureWalletInfo[] {
        const finalNewWallets: SecureWalletInfo[] = [];
        for (const walletGroup of wallets) {
            const newIds: number[] = [];
            for (const walletId of walletGroup.walletIds) {
                if (walletId > walletIdToBeDeleted) {
                    newIds.push(walletId - 1);
                }
            }
            if (newIds.length > 0) {
                finalNewWallets.push({ privateKey: walletGroup.privateKey, walletIds: newIds });
            }
        }
        return finalNewWallets;
    }

    static findByPrivateKey(privateKey: string, wallets: SecureWalletInfo[]): SecureWalletInfo | undefined {
        return wallets.find((wallet) => wallet.privateKey === privateKey);
    }

    static findByWalletId(walletId: number, wallets: SecureWalletInfo[]): SecureWalletInfo | undefined {
        return wallets.find((wallet) => wallet.walletIds.includes(walletId));
    }

    static getNewIds(walletGroup: SecureWalletInfo, walletIds: number[]): number[] {
        return walletIds.filter((id) => !walletGroup.walletIds.includes(id));
    }
}
