import { IntentsTokenBalance } from "near-peersyst-sdk";
import { TypographyProps } from "module/common/component/display/Typography/Typography";
import { DimensionValue, ViewStyle } from "react-native";

export interface IntentsTokenNameWithIconProps extends Pick<TypographyProps, "variant"> {
    token: IntentsTokenBalance;
    gap?: DimensionValue | undefined;
    nameChipGap?: DimensionValue | undefined;
    typographyProps?: Omit<TypographyProps, "variant" | "style">;
    style?: ViewStyle;
    typographyStyle?: TypographyProps["style"];
}
