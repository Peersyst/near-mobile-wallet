import { SelectHeader, SelectRoot } from "module/common/component/input/Select/Select.styles";
import { SelectProps as BaseSelectProps } from "@peersyst/react-native-components";

export interface SelectProps<T> extends Omit<BaseSelectProps<T>, "header" | "footer"> {
    title?: string;
}

function Select<T = any>({ title, label, ...rest }: SelectProps<T>): JSX.Element {
    // @ts-ignore
    return <SelectRoot header={<SelectHeader variant="h3">{title ?? label}</SelectHeader>} label={label} {...rest} />;
}

export default Select;
