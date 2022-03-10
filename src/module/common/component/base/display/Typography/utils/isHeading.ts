import { OverridableStringUnion } from "@peersyst/react-types";
import { TypographyVariants, TypographyVariantsOverrides } from "../../../style";

type TypographyVariantType = OverridableStringUnion<TypographyVariants, TypographyVariantsOverrides>;

const isHeading = (variant: TypographyVariantType) => {
    return variant[0] === "h";
};
export default isHeading;
