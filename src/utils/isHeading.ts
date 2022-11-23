import { OverridableStringUnion } from "@peersyst/react-types";
import { TypographyVariants, TypographyVariantsOverrides } from "@peersyst/react-native-components";

type TypographyVariantType = OverridableStringUnion<TypographyVariants, TypographyVariantsOverrides>;

const isHeading = (variant: TypographyVariantType) => {
    return variant === "h1";
};
export default isHeading;
