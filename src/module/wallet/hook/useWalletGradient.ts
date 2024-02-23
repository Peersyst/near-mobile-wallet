import { PaletteGradient } from "refactor/ui/config/theme/theme.declarations";
import { WalletUtils } from "../utils/WalletUtils";
import useWalletState from "./useWalletState";
import { useTheme } from "@peersyst/react-native-components";
import useAuthState from "refactor/ui/adapter/state/useAuthState";

export default function (index?: number): PaletteGradient {
    const {
        state: { wallets = [], selectedWallet = 0 },
    } = useWalletState();

    const { isAuthenticated } = useAuthState();

    const {
        palette: { wallet: walletColors },
    } = useTheme();

    if (wallets.length === 0 || !isAuthenticated) return walletColors[0];

    const finalIndex = index === undefined ? (selectedWallet > wallets.length - 1 ? 0 : selectedWallet) : index;
    const wallet = WalletUtils.getWallet(finalIndex, wallets);
    return walletColors[(wallet?.colorIndex ?? 0) % walletColors.length];
}
