import { Typography } from "@peersyst/react-native-components";
import { FormGroupProps as BaseFormGroupProps, FormGroup as BaseFormGroup } from "react-native-components";

export interface FormGroupProps extends Omit<BaseFormGroupProps, "label"> {
    label: string;
}

const FormGroup = ({ label, ...rest }: FormGroupProps): JSX.Element => (
    <BaseFormGroup label={<Typography variant="body1">{label}</Typography>} {...rest} />
);

export default FormGroup;
