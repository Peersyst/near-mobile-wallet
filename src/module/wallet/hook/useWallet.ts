import { Wallet } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";

export default function (index: number): Wallet {
    const {
        state: { wallets },
    } = useWalletState();
    return wallets[index];
}
