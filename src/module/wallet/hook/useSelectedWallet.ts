import { Wallet } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";

export default function (): Wallet {
    const {
        state: { wallets, selectedWallet = 0 },
    } = useWalletState();
    return selectedWallet > wallets.length - 1 ? wallets[wallets.length - 1] : wallets[selectedWallet];
}
