import { Wallet } from "../state/WalletState";
import { BaseWallet, SecureWalletInfo, UpdatableWallet } from "../wallet.types";

export function updateUncommitedTransactionHashes<W extends Wallet>(wallet: W, uncommittedTransactionHashes: string[]): W {
    return {
        ...wallet,
        uncommittedTransactionHashes,
    };
}

export function updateWalletUncommittedTxHashes<W extends Wallet>(wallets: W[], hashes: string[], walletIndex: number): W[] {
    return wallets.map((w, index) => {
        if (index !== walletIndex) return w;
        else {
            return updateUncommitedTransactionHashes(w, hashes);
        }
    });
}

export function setWallet<W extends BaseWallet>(wallets: W[], wallet: W, index: number): W[] {
    return wallets.map((w) => {
        if (w.index !== index) return w;
        else return wallet;
    });
}

export function orderWallets<W extends BaseWallet>(wallets: W[]): W[] {
    return wallets.sort((a, b) => a.index - b.index);
}

export function getWallet<W extends BaseWallet>(index: number, wallets?: W[]): W | undefined {
    if (!wallets) return undefined;
    if (wallets[index].index === index) return wallets[index]; //Avoid filtering if they are in order
    return wallets.find((wallet) => wallet.index === index);
}

export default function deleteWallet<W extends BaseWallet>(wallets: W[], index: number): W[] {
    return wallets
        .filter((wallet) => wallet.index !== index)
        .map((wallet) => (wallet.index > index ? { ...wallet, index: wallet.index - 1 } : wallet));
}

export function updateWallet<W extends UpdatableWallet>(wallets: W[], index: number, info: Partial<W>): W[] {
    return wallets.map((wallet) => (wallet.index === index ? { ...wallet, ...info } : wallet));
}

export function resetWallet<W extends UpdatableWallet>(wallets: W[], index: number, baseInfo: W): W[] {
    return updateWallet<W>(wallets, index, baseInfo);
}

export function deleteWalletFromPrivateKey(privateKey: string, wallets: SecureWalletInfo[]): SecureWalletInfo[] {
    return wallets.filter((wallet) => wallet.privateKey !== privateKey);
}

export function filterWalletId(walletId: number, walletIds: SecureWalletInfo["walletIds"]): SecureWalletInfo["walletIds"] {
    return walletIds.filter((id) => id !== walletId);
}

export function deleteWalletId(walletId: number, { walletIds, ...rest }: SecureWalletInfo): SecureWalletInfo {
    return {
        ...rest,
        walletIds: filterWalletId(walletId, walletIds),
    };
}

export function findByPrivateKey(privateKey: string, wallets: SecureWalletInfo[]): SecureWalletInfo | undefined {
    return wallets.find((wallet) => wallet.privateKey === privateKey);
}

export function findByWalletId(walletId: number, wallets: SecureWalletInfo[]): SecureWalletInfo | undefined {
    return wallets.find((wallet) => wallet.walletIds.includes(walletId));
}
