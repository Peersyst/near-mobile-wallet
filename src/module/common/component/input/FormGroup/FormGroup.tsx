import { FormGroupProps as BaseFormGroupProps, FormGroup as BaseFormGroup, Typography } from "react-native-components";

export interface FormGroupProps extends Omit<BaseFormGroupProps, "label"> {
    label: string;
}

const FormGroup = ({ label, ...rest }: FormGroupProps): JSX.Element => (
    <BaseFormGroup label={<Typography variant="h3">{label}</Typography>} {...rest} />
);

export default FormGroup;
