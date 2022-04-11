import { Children, ReactElement, ReactNode } from "react";
import { Col } from "react-native-components";
import { ViewStyle } from "react-native";

export interface FormGroupProps {
    style?: ViewStyle & { gap?: number };
    children: ReactNode;
    label: ReactElement;
}

const FormGroup = ({ children, label, style: { gap = 10, ...style } = {} }: FormGroupProps): JSX.Element => {
    return (
        <Col gap={gap} style={style}>
            {label}
            {Children.only(children)}
        </Col>
    );
};

export default FormGroup;
