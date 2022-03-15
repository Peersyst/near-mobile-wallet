import styled from "@peersyst/react-native-styled";
import { ReactNode } from "react";
import { Col } from "react-native-components";

interface FormGroupProps {
    children: ReactNode[];
}

const FormGroupRoot = styled(Col, { gap: 15 })(() => ({
    marginBottom: 10,
}));

const FormGroup = ({ children }: FormGroupProps): JSX.Element => {
    return <FormGroupRoot>{children}</FormGroupRoot>;
};

export default FormGroup;
