import { useCallback, useContext } from "react";
import { SelectContext } from "../SelectContext";
import { SelectItemRoot, SelectItemText } from "./SelectItem.styles";
import { useSelected } from "../hooks/useSelected";
import { handleSelection } from "../utils/handleSelection";
import { SelectItemProps } from "./SelectItem.types";
import useSelectItemStyle from "./hooks/useSelectIemStyles";
import { TouchableWithoutFeedback } from "react-native";
import { getLuminance } from "@peersyst/react-utils";

export default function SelectItem({ children, value, style = {} }: SelectItemProps): JSX.Element {
    const { setValue, setOpen, readonly, value: selected, multiple } = useContext(SelectContext);
    const isSelected = useSelected(value, selected, multiple);

    const [textStyle, rootStyle] = useSelectItemStyle(style, isSelected, readonly);

    const handlePress = useCallback(() => {
        if (!readonly) {
            setValue(handleSelection(value, selected, multiple, isSelected));
            !multiple && setOpen(false);
        }
    }, [value, selected, multiple, readonly, isSelected, setValue, setOpen]);

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <SelectItemRoot style={rootStyle}>
                <SelectItemText
                    style={[
                        textStyle,
                        rootStyle.backgroundColor && rootStyle.backgroundColor !== "transparent"
                            ? {
                                  color: getLuminance(rootStyle.backgroundColor as string) > 0.5 ? "#000000" : "#FFFFFF",
                              }
                            : undefined,
                    ]}
                >
                    {children}
                </SelectItemText>
            </SelectItemRoot>
        </TouchableWithoutFeedback>
    );
}
