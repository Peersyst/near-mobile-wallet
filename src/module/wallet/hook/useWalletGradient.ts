import { useTheme } from "@peersyst/react-native-styled";
import { WALLET_GRADIENT_LENGTH } from "config/theme/baseTheme";
import { PaletteGradient } from "config/theme/theme.declarations";
import useWalletState from "./useWalletState";

export default function (index?: number): PaletteGradient {
    const {
        state: { wallets, selectedWallet = 0 },
    } = useWalletState();

    const finalIndex = (index ?? selectedWallet > wallets.length - 1 ? 0 : selectedWallet) % WALLET_GRADIENT_LENGTH;

    const {
        palette: { wallet: walletColors },
    } = useTheme();

    return walletColors[finalIndex];
}
