import { NativeSyntheticEvent, NativeTouchEvent, StyleProp, ViewStyle } from "react-native";

export type ZeroToNine = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type PadIconType = "X" | "<";

export type PadItemType = ZeroToNine | PadIconType;

export const zeroToNine: ZeroToNine[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const isZeroToNine = (x: any): x is ZeroToNine => zeroToNine.includes(x);

export interface PadItemProps {
    style?: StyleProp<ViewStyle>;
    item: PadItemType,
    onPress: (param?: any, ev?: NativeSyntheticEvent<NativeTouchEvent>) => void;
}