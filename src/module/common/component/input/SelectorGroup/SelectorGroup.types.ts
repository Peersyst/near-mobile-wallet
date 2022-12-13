import { CoreSelectorGroupProps, SelectorDirection, SelectorProps } from "@peersyst/react-components-core";
import { RowProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-native-components";
import { NativeSelectorType } from "./Selector/Selector.types";

export type SelectorGroupLayoutProps = Pick<RowProps, "gap" | "justifyContent" | "alignItems">;

export type SelectorGroupProps<T, Multiple extends boolean = false, D extends SelectorDirection = "column"> = FormControlledComponentProps<
    CoreSelectorGroupProps<T, SelectorProps<T>, LabelProps, D, Multiple, NativeSelectorType>
> &
    SelectorGroupLayoutProps & {
        selectorLabelProps?: Omit<LabelProps, "label">;
    };

export type InnerSelectorGroupProps<T, Multiple extends boolean = false, D extends SelectorDirection = "column"> = Pick<
    SelectorGroupProps<T, Multiple, D>,
    "options" | "children" | "selectorLabelProps"
> &
    Required<Pick<SelectorGroupProps<T, Multiple, D>, "direction" | "disabled" | "readonly" | "type" | "multiple" | "value">> &
    SelectorGroupLayoutProps & {
        setValue: (val: Multiple extends true ? T[] : T) => any;
        style?: RowProps["style"];
    };
