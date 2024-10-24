import { useColor } from "@peersyst/react-native-components";
import { LoadingLogoIcon, LoadingLogoIconRoot } from "./LoadingLogo.styles";
import { LoadingLogoProps } from "./LoadingLogo.types";
import useWalletColor from "module/wallet/hook/useWalletColor";

export function LoadingLogo({ style = {}, color: colorProp }: LoadingLogoProps): JSX.Element {
    const walletColor = useWalletColor();
    const parsedThemeColor = useColor(colorProp);
    const { size = 120, color: styleColor, ...restStyle } = style;
    const color = styleColor ?? parsedThemeColor ?? walletColor;

    return (
        <LoadingLogoIconRoot size={size} color={color} style={restStyle}>
            <LoadingLogoIcon size={size} color={color} />
        </LoadingLogoIconRoot>
    );
}
