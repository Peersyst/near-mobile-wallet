import { SelectStyle } from "../Select.types";
import useSelectDisplayDefaultStyles from "./useSelectDisplayDefaultStyles";
import { extractTextStyles } from "utils/extractTextStyles";
import { TextStyle, ViewStyle } from "react-native";
import { SelectItemStyles } from "react-native-components";

export interface UseSelectStyles {
    style: ViewStyle;
    display: [TextStyle, ViewStyle];
    menu: ViewStyle;
    item: SelectItemStyles;
}

const useSelectDisplayStyles = (
    {
        display: { disabled: displayDisabledStyle, readonly: displayReadonlyStyle, ...displayStyle } = {},
        menu: menuStyle,
        item = {},
        ...style
    }: SelectStyle,
    disabled: boolean,
    readonly: boolean,
): UseSelectStyles => {
    const {
        defaultStyle: [defaultDisplayTextStyle, defaultDisplayRootStyle],
        defaultDisabledStyle: [defaultDisabledDisplayTextStyle, defaultDisabledDisplayRootStyle],
    } = useSelectDisplayDefaultStyles();

    const [displayDisabledTextStyle, displayDisableRootStyle] = extractTextStyles(displayDisabledStyle);
    const [displayReadonlyTextStyle, displayReadonlyRootStyle] = extractTextStyles(displayReadonlyStyle);
    const [displayTextStyle, displayRootStyle] = extractTextStyles(displayStyle);

    const displayTextStyles = {
        ...defaultDisplayTextStyle,
        ...displayTextStyle,
        ...(readonly && displayReadonlyTextStyle),
        ...(disabled && { ...defaultDisabledDisplayTextStyle, ...displayDisabledTextStyle }),
    };
    const displayRootStyles = {
        ...defaultDisplayRootStyle,
        ...displayRootStyle,
        ...(readonly && displayReadonlyRootStyle),
        ...(disabled && { ...defaultDisabledDisplayRootStyle, ...displayDisableRootStyle }),
    };

    return {
        style,
        display: [displayTextStyles, displayRootStyles],
        menu: menuStyle || {},
        item,
    };
};

export default useSelectDisplayStyles;
