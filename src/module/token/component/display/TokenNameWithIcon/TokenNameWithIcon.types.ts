import { Token } from "near-peersyst-sdk";
import { TypographyProps } from "module/common/component/display/Typography/Typography";
import { DimensionValue, ViewStyle } from "react-native";

export interface TokenNameWithIconProps extends Pick<TypographyProps, "variant"> {
    token: Token;
    gap?: DimensionValue | undefined;
    typographyProps?: Omit<TypographyProps, "variant" | "style">;
    style?: ViewStyle;
    typographyStyle?: TypographyProps["style"];
}
