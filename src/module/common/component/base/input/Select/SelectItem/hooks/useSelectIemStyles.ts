import { TextStyle, ViewStyle } from "react-native";
import { SelectItemStyles } from "../SelectItem.types";
import useDefaultSelectItemStyles from "./useDefaultSelectItemStyles";
import { extractTextStyles } from "utils/extractTextStyles";

const useSelectItemStyles = (
    { selected: selectedStyle = {}, readonly: readonlyStyle, ...style }: SelectItemStyles,
    selected: boolean,
    readonly: boolean,
): [TextStyle, ViewStyle] => {
    const { defaultSelectedStyle } = useDefaultSelectItemStyles();

    const [defaultTextSelectedStyle, defaultRootSelectedStyle] = extractTextStyles(defaultSelectedStyle);
    const [textStyle, rootStyle] = extractTextStyles(style);
    const [selectedTextStyle, selectedRootStyle] = extractTextStyles(selectedStyle);
    const [readonlyTextStyle, readonlyRootStyle] = extractTextStyles(readonlyStyle);

    const textStyles = {
        ...textStyle,
        ...(selected && { ...defaultTextSelectedStyle, ...selectedTextStyle }),
        ...(readonly && readonlyTextStyle),
    };
    const rootStyles = {
        ...rootStyle,
        ...(selected && { ...defaultRootSelectedStyle, ...selectedRootStyle }),
        ...(readonly && readonlyRootStyle),
    };

    return [textStyles, rootStyles];
};

export default useSelectItemStyles;
