import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { SelectItem } from "react-native-components";
import FormGroup from "../FormGroup/FormGroup";

interface SelectGroupProps extends Required<Pick<SelectProps, "title" | "onChange">> {
    options: (string | number)[];
}

const SelectGroup = ({ title, options, onChange }: SelectGroupProps): JSX.Element => {
    return (
        <FormGroup label={title}>
            <Select placeholder={options[0].toString()} title={title} onChange={(value) => onChange(value as string | number)}>
                {options.map((option, index) => {
                    return (
                        <SelectItem key={index} value={option}>
                            {option}
                        </SelectItem>
                    );
                })}
            </Select>
        </FormGroup>
    );
};

export default SelectGroup;
