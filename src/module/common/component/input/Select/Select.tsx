import { SelectHeader, SelectRoot } from "module/common/component/input/Select/Select.styles";
import { SelectProps as BaseSelectProps } from "@peersyst/react-native-components";

export interface SelectProps<T> extends Omit<BaseSelectProps<T>, "header" | "footer"> {
    title?: string;
}

function Select<T = any>({ title, ...rest }: SelectProps<T>): JSX.Element {
    // @ts-ignore
    return <SelectRoot header={title && <SelectHeader variant="h3">{title}</SelectHeader>} {...rest} />;
}

export default Select;
