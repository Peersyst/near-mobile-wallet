import { ReactElement, ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { SelectItemProps, SelectItemStyles } from "./SelectItem";

export interface DisplayStylesProps {
    open: boolean;
    disabled: boolean;
}

export type DisplayStyle = ViewStyle &
    TextStyle & {
        disabled?: ViewStyle & TextStyle;
        readonly?: ViewStyle & TextStyle;
    };

export type SelectStyle = Omit<ViewStyle, "display"> & {
    display?: DisplayStyle;
    menu?: ViewStyle;
    item?: SelectItemStyles;
};

export interface SelectProps {
    /**
     * Name of Select in the form
     */
    name?: string;
    /**
     * An option must be selected
     */
    required?: boolean;
    /**
     * Make the selection multiple
     */
    multiple?: boolean;
    /**
     * Default value
     */
    defaultValue?: unknown | unknown[];
    /**
     * Select value
     */
    value?: unknown | unknown[];
    /**
     * OnChange handler
     */
    onChange?: (value: unknown | unknown[]) => unknown;
    /**
     * Placeholder
     */
    placeholder?: string;
    /**
     * SelectDisplay icon
     */
    icon?: ReactElement;
    /**
     * Controlled menu open
     */
    open?: boolean;
    /**
     * onOpen handler
     */
    onOpen?: () => void;
    /**
     * onCLose handler
     */
    onClose?: () => void;
    /**
     * If SelectMenu should open on mount
     */
    autoFocus?: boolean;
    /**
     * Disabled
     */
    disabled?: boolean;
    /**
     * Readonly
     */
    readonly?: boolean;
    /**
     * Customize how display renders selected options
     */
    renderValue?: (val: ReactNode | ReactNode[]) => ReactNode;
    /**
     * Header element
     */
    header?: ReactNode;
    /**
     * Footer element
     */
    footer?: ReactNode;
    /**
     * Select style
     */
    style?: SelectStyle;
    /**
     * Select options
     */
    children?: ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[];
}
