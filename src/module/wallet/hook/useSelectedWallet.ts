import { Wallet } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletUtils } from "../utils/WalletUtils";

export default function (): Wallet {
    const {
        state: { wallets, selectedWallet = 0 },
    } = useWalletState();
    const selectedIndex = selectedWallet > wallets.length - 1 ? wallets.length - 1 : selectedWallet;
    return WalletUtils.getWallet(selectedIndex, wallets)!;
}
