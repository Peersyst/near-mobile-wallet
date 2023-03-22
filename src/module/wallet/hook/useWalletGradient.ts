import { PaletteGradient } from "config/theme/theme.declarations";
import { WalletUtils } from "../utils/WalletUtils";
import useWalletState from "./useWalletState";
import { useTheme } from "@peersyst/react-native-components";

export default function (index?: number): PaletteGradient {
    const {
        state: { wallets, selectedWallet = 0 },
    } = useWalletState();
    const {
        palette: { wallet: walletColors },
    } = useTheme();

    if (wallets.length === 0) return walletColors[0];

    const finalIndex = index === undefined ? (selectedWallet > wallets.length - 1 ? 0 : selectedWallet) : index;
    const wallet = WalletUtils.getWallet(finalIndex, wallets);

    return walletColors[wallet?.colorIndex ?? 0 % walletColors.length];
}
