import { ReactElement } from "react";
import { PaletteMode } from "react-native-components";
import { ViewStyle } from "react-native";

/**
 * Circular -> with borderRadius
 * Stadium -> theme borderRadius
 * Reactangular -> no borderRadius
 */
export type SkeletonShape = "circular" | "rectangular" | "stadium";

export interface SkeletonProps {
    /**
     * Skeleton width
     */
    width?: ViewStyle["width"];
    /**
     * Skeleton height
     */
    height?: ViewStyle["height"];
    /**
     * Skeleton shape
     */
    shape?: SkeletonShape;
    /**
     * Is loading, skeleton is visible
     */
    loading?: boolean;
    /**
     * Skeleton appearance
     */
    appearance?: PaletteMode;
    /**
     * Skeleton style
     */
    style?: ViewStyle;
    /**
     * Skeleton content
     */
    children?: ReactElement | false | undefined;
}

export interface SkeletonRootProps {
    height: ViewStyle["height"];
    width: ViewStyle["width"];
    shape: NonNullable<SkeletonProps["shape"]>;
}

export type SkeletonOverlayProps = Pick<SkeletonProps, "appearance">;
export type SkeletonAnimationProps = SkeletonOverlayProps;

export type WithSkeleton<T> = T & { loading?: boolean };
export type WithLoading<TProps> = TProps | (Partial<TProps> & { loading: boolean });

export type WithSkeletonProps = Omit<SkeletonProps, "loading" | "children">;
