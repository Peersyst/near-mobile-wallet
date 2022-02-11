import { Theme } from "./theme.types";
import { CreateTheme } from "./createTheme.types";
import { defaultTheme } from "./defaultTheme";
import { deepmerge } from "@peersyst/react-utils";

export function createTheme({
    icons,
    typography,
    palette,
    borderRadius,
    /*toastAnimation,
    toastPosition,*/
    zIndex,
    /*skeletonAnimations,
    translate,*/
    ...rest
}: CreateTheme): Theme {
    return {
        icons: { ...defaultTheme.icons, ...icons },
        typography: deepmerge(defaultTheme.typography, typography),
        palette: deepmerge(defaultTheme.palette, palette),
        shadows: defaultTheme.shadows,
        borderRadius: borderRadius || defaultTheme.borderRadius,
        /*toastAnimation: toastAnimation || defaultTheme.toastAnimation,
        toastPosition: toastPosition || defaultTheme.toastPosition,*/
        zIndex: { ...defaultTheme.zIndex, ...zIndex },
        /*skeletonAnimations: skeletonAnimations || defaultTheme.skeletonAnimations,
        translate: translate || defaultTheme.translate,*/
        ...rest,
    };
}
