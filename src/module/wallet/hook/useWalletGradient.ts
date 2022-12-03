import { useTheme } from "@peersyst/react-native-styled";
import { PaletteGradient } from "config/theme/theme.declarations";
import useSelectedWallet from "./useSelectedWallet";

export default function (index?: number): PaletteGradient {
    const wallet = useSelectedWallet();
    const {
        palette: { wallet: walletColors },
    } = useTheme();
    const finalIndex = (index ?? wallet?.colorIndex ?? 0) % walletColors.length;
    return walletColors[finalIndex];
}
