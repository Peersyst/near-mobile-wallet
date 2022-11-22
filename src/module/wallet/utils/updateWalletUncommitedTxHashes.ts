import { NetworkType } from "module/settings/state/SettingsState";
import { UnencryptedWalletInfo } from "../WalletStorage";

export default function updateWalletUncommitedTxHashes<W extends UnencryptedWalletInfo>(
    wallets: W[],
    walletIndex: number,
    network: NetworkType,
    hashes: string[],
): W[] {
    return wallets.map((w) => {
        if (w.index !== walletIndex) return w;
        else {
            const walletInfo = w[network];
            return {
                ...w,
                [network]: {
                    ...walletInfo,
                    uncommittedTransactionHashes: hashes,
                },
            };
        }
    });
}
