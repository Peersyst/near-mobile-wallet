import { Wallet } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";

export default function (): Wallet {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    let index = 0;
    if (selectedWallet) index = selectedWallet > wallets.length ? wallets.length - 1 : selectedWallet;
    return wallets[index];
}
