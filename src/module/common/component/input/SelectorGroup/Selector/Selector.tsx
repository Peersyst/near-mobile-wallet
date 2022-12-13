import { Selector as CoreSelector, SelectorControllerProps, useMergeDefaultProps } from "@peersyst/react-components-core";
import { RadioButton, Switch } from "@peersyst/react-native-components";
import { JSXElementConstructor } from "react";
import { NativeSelectorType, SelectorProps } from "./Selector.types";

export const SELECTOR_CONTROLLERS: Record<NativeSelectorType, JSXElementConstructor<SelectorControllerProps>> = {
    radio: RadioButton,
    switch: Switch,
};

function Selector<T>(props: SelectorProps<T>): JSX.Element {
    const { type = "radio", value, LabelProps, ...rest } = useMergeDefaultProps("Selector", props);

    const Controller = SELECTOR_CONTROLLERS[type];

    return (
        <CoreSelector value={value}>
            {({ setSelected, isSelected, readonly, disabled }) => {
                return (
                    <Controller
                        readonly={readonly}
                        disabled={disabled}
                        value={isSelected}
                        onChange={setSelected}
                        LabelProps={{ placement: "right", ...LabelProps }}
                        {...rest}
                    />
                );
            }}
        </CoreSelector>
    );
}

export default Selector;
