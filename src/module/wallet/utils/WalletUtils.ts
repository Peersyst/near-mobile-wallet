import { WALLET_GRADIENT_LENGTH } from "refactor/ui/config/theme/baseTheme";
import { BaseWallet, SecureWalletInfo, UnencryptedWalletInfo } from "../wallet.types";

export class WalletUtils {
    //Base wallet methods
    static setWallet<W extends BaseWallet>(wallets: W[], wallet: W, index: number): W[] {
        return wallets.map((w) => {
            if (w.index !== index) return w;
            else return wallet;
        });
    }
    static getWallet<W extends BaseWallet>(index: number, wallets: W[] | undefined): W | undefined {
        if (!wallets || index > wallets.length) return undefined;
        const wallet = wallets[index];
        if (!wallet) return undefined;
        if (wallet.index === index) return wallet; //Avoid filtering if they are in order
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

    //UNENCRYPTED wallet methods
    static addWallet<W extends UnencryptedWalletInfo>(wallets: W[], wallet: Omit<W, "index">): W[] {
        const newWallet = {
            ...wallet,
            index: wallets.length,
        } as W;
        return [...wallets, newWallet];
    }

    //Color methods
    static getWalletColor(account: string): number {
        try {
            const charNum = account
                .slice(0, 8)
                .split("")
                .reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return charNum % WALLET_GRADIENT_LENGTH;
        } catch (e) {
            return 0;
        }
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

    static findSecureByWalletId(walletId: number, wallets: SecureWalletInfo[]): SecureWalletInfo | undefined {
        return wallets.find((wallet) => wallet.walletIds.includes(walletId));
    }

    static getNewIds(walletGroup: SecureWalletInfo, walletIds: number[]): number[] {
        return walletIds.filter((id) => !walletGroup.walletIds.includes(id));
    }
}
