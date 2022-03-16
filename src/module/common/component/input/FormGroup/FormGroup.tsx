import styled from "@peersyst/react-native-styled";
import { ReactNode } from "react";
import { Col, Typography } from "react-native-components";

interface FormGroupProps {
    children: ReactNode;
    label: string;
}

const FormGroupRoot = styled(Col, { gap: 15 })(() => ({
    marginBottom: 10,
}));

const FormGroup = ({ children, label }: FormGroupProps): JSX.Element => {
    return (
        <FormGroupRoot>
            <Typography variant="h3">{label}</Typography>
            {children}
        </FormGroupRoot>
    );
};

export default FormGroup;
