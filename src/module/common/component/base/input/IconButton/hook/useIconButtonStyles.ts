import { IconButtonStyles } from "../IconButton.types";
import { useMemo } from "react";
import { extractTextStyles } from "utils/extractTextStyles";
import useDefaultStyles from "./useDefaultStyles";
import { TextStyle, ViewStyle } from "react-native";

export interface UseIconButtonStylesResult {
    textStyle: TextStyle;
    rootStyle: ViewStyle;
}

export default function useIconButtonStyles(style: IconButtonStyles, pressed: boolean, disabled: boolean): UseIconButtonStylesResult {
    const { defaultStyles, defaultDisabledStyles, defaultPressedStyles } = useDefaultStyles();
    const { pressed: pressedStyles, disabled: disabledStyles, ...styles } = style;

    const [textStyles, rootStyles] = useMemo(() => extractTextStyles({ ...defaultStyles, ...styles }), [defaultStyles, styles]);
    const [pressedTextStyles, pressedRootStyles] = useMemo(
        () => extractTextStyles({ ...defaultPressedStyles, ...pressedStyles }),
        [defaultPressedStyles, pressedStyles],
    );
    const [disabledTextStyles, disabledRootStyles] = useMemo(
        () => extractTextStyles({ ...defaultDisabledStyles, ...disabledStyles }),
        [defaultDisabledStyles, disabledStyles],
    );

    const textStyle = {
        ...textStyles,
        ...(pressed && pressedTextStyles),
        ...(disabled && disabledTextStyles),
    };

    const rootStyle = {
        ...rootStyles,
        ...(pressed && pressedRootStyles),
        ...(disabled && disabledRootStyles),
    };

    return { textStyle, rootStyle };
}
