import { useTheme } from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import { TypographyProps } from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import { ViewStyle } from "react-native";

export interface useDAppStatusReturn {
    label: string;
    labelStyles: Omit<TypographyProps, "variant">;
    rootStyles: ViewStyle;
}

export default function useDAppStatus(connected: boolean) {
    const translate = useTranslate();
    const theme = useTheme();

    const selectedColor = connected ? theme.palette.green : theme.palette.gray[600];

    const label = translate(connected ? "connected" : "notConnected");
    const labelStyles: Omit<TypographyProps, "variant"> = { color: () => selectedColor };
    const rootStyles: ViewStyle = { backgroundColor: alpha(selectedColor, 0.12) };

    return { label, labelStyles, rootStyles };
}
