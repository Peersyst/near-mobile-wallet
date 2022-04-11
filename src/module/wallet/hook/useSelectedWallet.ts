import { Wallet } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";

export default function (index?: number): Wallet {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    let usedIndex = 0;
    if (index !== undefined) usedIndex = index;
    else if (selectedWallet !== undefined) {
        usedIndex = selectedWallet < wallets.length ? selectedWallet : wallets.length - 1;
    }
    return wallets[usedIndex];
}
