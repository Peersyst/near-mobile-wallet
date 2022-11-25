import { NetworkType } from "module/settings/state/SettingsState";
import { BaseStorageWallet, UnencryptedWalletInfo, UpdatableWallet } from "../wallet.types";

export function updateWalletUncommittedTxHashes<W extends UnencryptedWalletInfo>(
    wallets: W[],
    walletIndex: number,
    network: NetworkType,
    hashes: string[],
): W[] {
    return wallets.map((w) => {
        if (w.index !== walletIndex) return w;
        else {
            return {
                ...w,
                [network]: {
                    ...w,
                    uncommittedTransactionHashes: hashes,
                },
            };
        }
    });
}

export function setWallet<W extends BaseStorageWallet>(wallets: W[], wallet: W, index: number): W[] {
    return wallets.map((w) => {
        if (w.index !== index) return w;
        else return wallet;
    });
}

export function orderWallets<W extends BaseStorageWallet>(wallets: W[]): W[] {
    return wallets.sort((a, b) => a.index - b.index);
}

export function getWallet<W extends BaseStorageWallet>(index: number, wallets?: W[]): W | undefined {
    if (!wallets) return undefined;
    if (wallets[index].index === index) return wallets[index]; //Avoid filtering if they are in order
    return wallets.find((wallet) => wallet.index === index);
}

export default function deleteWallet<W extends BaseStorageWallet>(wallets: W[], index: number): W[] {
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
