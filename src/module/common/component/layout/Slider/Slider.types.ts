import { Animated, ListRenderItem, StyleProp, ViewStyle } from "react-native";

export interface SliderProps {
    data: any[];
    renderItem: ListRenderItem<any>;
    keyExtractor?: ((item: any, index: number) => string) | undefined;
    style?: StyleProp<ViewStyle>;
    showPaginaton?: boolean;
    pagginationGap?: number;
    dotColor?: string;
}

export interface PaginatorProps {
    scrollX: Animated.Value;
    data: any[];
    dotColor?: string;
}

export interface AnimatedDotProps { color?: string }
