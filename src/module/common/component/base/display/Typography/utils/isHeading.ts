import { TypographyVariantType } from "../Typography.types";

const isHeading = (variant: TypographyVariantType) => {
    return variant[0] === "h";
};
export default isHeading;
