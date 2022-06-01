import { OverridableStringUnion } from "@peersyst/react-types";
import { TypographyVariants, TypographyVariantsOverrides } from "module/common/component/base/style";

type TypographyVariantType = OverridableStringUnion<TypographyVariants, TypographyVariantsOverrides>;

const isHeading = (variant: TypographyVariantType) => {
    return variant === "h1";
};
export default isHeading;
