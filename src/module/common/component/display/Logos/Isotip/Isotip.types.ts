import { SizeType } from "module/common/types";

export type IsotipSizeType = SizeType | "xl";

export type SizeIsotipRelationType = Record<IsotipSizeType, { fontSize: number }>;

export type IsotipProps = { size: IsotipSizeType };
