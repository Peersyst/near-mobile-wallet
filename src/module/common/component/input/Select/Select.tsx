import { SelectHeader, SelectRoot } from "module/common/component/input/Select/Select.styles";
import { SelectProps as BaseSelectProps } from "react-native-components";

export interface SelectProps extends Omit<BaseSelectProps, "header" | "footer"> {
    title?: string;
}

const Select = ({ title, ...rest }: SelectProps): JSX.Element => {
    return <SelectRoot header={title && <SelectHeader variant="h3">{title}</SelectHeader>} {...rest} />;
};

export default Select;
