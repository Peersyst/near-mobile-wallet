import { Children, cloneElement, ReactElement, useCallback } from "react";
import { useControlled } from "@peersyst/react-hooks";
import { useSelectDisplayContent } from "./hooks/useSelectDisplayContent";
import { useFormNotification } from "../Form";
import { selectIsValid } from "./utils/selectIsValid";
import { renderValue as renderDefaultValue } from "./utils/renderValue";
import { SelectProps } from "./Select.types";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import useSelectStyles from "./hooks/useSelectStyles";
import { SelectProvider } from "./SelectContext";
import { SelectMenu } from "./SelectMenu";
import { ChevronDownIcon } from "module/common/component/base/assets/icons";
import { Icon, Row } from "module/common/component/base";

export default function Select({
    name,
    required,
    multiple = false,
    defaultValue,
    value: valueProp,
    onChange,
    open: openProp,
    onClose,
    onOpen,
    placeholder,
    icon = <ChevronDownIcon />,
    autoFocus = false,
    disabled = false,
    readonly = false,
    style: styleProp,
    renderValue,
    header,
    footer,
    children,
    display,
}: SelectProps): JSX.Element {
    const [value, setValue] = useControlled<unknown | unknown[]>(defaultValue || (multiple ? [] : undefined), valueProp, onChange);
    useFormNotification(name, value, selectIsValid(value, multiple, required));
    const [open, setOpen] = useControlled(autoFocus, openProp, openProp ? onClose : onOpen);

    const displayContent = useSelectDisplayContent(value, multiple, children);

    const handlePress = useCallback(() => {
        !disabled && setOpen(!open);
    }, [open, disabled]);

    const {
        style,
        display: [displayTextStyle, { placeholderColor, ...displayRootStyle }],
        menu: menuStyle,
        item: itemStyle,
    } = useSelectStyles(styleProp || {}, disabled, readonly);

    const renderedValue = renderValue ? (
        renderValue(displayContent)
    ) : (
        <Text style={displayTextStyle} numberOfLines={1}>
            {renderDefaultValue(displayContent)}
        </Text>
    );

    return (
        <View style={style}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <View onStartShouldSetResponderCapture={() => true}>
                    {display || (
                        <Row style={displayRootStyle} alignItems="center" justifyContent="space-between">
                            <View style={{ maxWidth: "92%" }}>
                                {renderedValue || (
                                    <Text style={[displayTextStyle, { color: placeholderColor }]} numberOfLines={1}>
                                        {placeholder}
                                    </Text>
                                )}
                            </View>
                            <Icon style={{ ...displayTextStyle, fontSize: 14 }}>{icon}</Icon>
                        </Row>
                    )}
                </View>
            </TouchableWithoutFeedback>
            <SelectProvider value={{ value, setValue, setOpen, multiple, readonly }}>
                <SelectMenu open={open} style={menuStyle} header={header} footer={footer}>
                    {Children.map(children, (child) => {
                        const { style: childStyle, ...rest } = child!.props || {};
                        return cloneElement(child!, { ...rest, style: { ...itemStyle, ...childStyle } }) as ReactElement;
                    })}
                </SelectMenu>
            </SelectProvider>
        </View>
    );
}
