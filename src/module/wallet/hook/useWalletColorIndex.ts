import { useTheme } from "@peersyst/react-native-styled";

export default function (index: number): string {
    const {
        palette: { wallet: walletColors },
    } = useTheme();
    return walletColors[index];
}
