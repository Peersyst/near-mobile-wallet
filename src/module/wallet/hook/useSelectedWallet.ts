import { Wallet } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";

export default function (): Wallet {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    return wallets[selectedWallet || 0];
}
