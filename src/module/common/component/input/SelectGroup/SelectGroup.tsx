import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { useState } from "react";
import { SelectItem, Typography } from "react-native-components";
import FormGroup from "../../base/input/FormGroup/FormGroup";

interface SelectGroupProps extends Pick<SelectProps, "title"> {
    options: (string | number)[];
    onChange: (value: string | number) => unknown;
}

const SelectGroup = ({ title, options, onChange }: SelectGroupProps): JSX.Element => {
    const [value, setValue] = useState<string | number>(options[0]);
    const handleChange = (value: string | number) => {
        setValue(value);
        onChange(value);
    };
    return (
        <FormGroup>
            <Typography variant="h3">{title}</Typography>
            <Select placeholder={value.toString()} title={title} value={value} onChange={(value) => handleChange(value as string | number)}>
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
