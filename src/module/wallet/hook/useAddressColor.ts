import { useTheme } from "@peersyst/react-native-styled";

export default function (address: string): string {
    const {
        palette: { address: addressColors },
    } = useTheme();
    const n = address.split("").reduce((p, c, i) => p + address.charCodeAt(i), 0) % addressColors.length;
    return addressColors[n];
}
