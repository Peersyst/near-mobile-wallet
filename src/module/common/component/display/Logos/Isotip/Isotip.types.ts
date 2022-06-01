import { SizeType } from "module/common/types";
import { ViewStyle } from "react-native";

export type IsotipSizeType = SizeType | "xl" | "xs";

export type SizeIsotipRelationType = Record<IsotipSizeType, { fontSize: number }>;

export type IsotipProps = { animation?: boolean; style?: ViewStyle; size: IsotipSizeType };
export type IsotipRootProps = { size: IsotipSizeType };
export type IsotipAnimationContainerProps = { size: IsotipSizeType };
