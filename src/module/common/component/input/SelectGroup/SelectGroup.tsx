import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { SelectItem } from "react-native-components";
import FormGroup from "../FormGroup/FormGroup";

export type optionType = {
    label: string | number;
    value: string | number;
}

interface SelectGroupProps extends Pick<SelectProps, "onChange" | "value"> {
    options: optionType[];
    label: string;
}

const SelectGroup = ({ label, options, ...rest }: SelectGroupProps): JSX.Element => {
    return (
        <FormGroup label={label}>
            <Select placeholder={options[0].label.toString()} title={label} {...rest}>
                {options.map((option, index) => {
                    return (
                        <SelectItem key={index} value={option.value}>
                            {option.label}
                        </SelectItem>
                    );
                })}
            </Select>
        </FormGroup>
    );
};

export default SelectGroup;
