import { Col, ElementStyler } from "@peersyst/react-native-components";
import { Placeholder } from "../../display/PinDisplay/PinDisplay.styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LabeledIconButtonButton } from "./LabeledIconButton.styles";
import { ButtonProps } from "../Button/Button.types";
import { ReactElement } from "react";

export interface LabeledIconButtonProps extends Omit<ButtonProps, "onPress" | "children"> {
    label: string;
    onPress: () => void;
    children: ReactElement;
}

const LabeledIconButton = ({ label, children, variant, onPress }: LabeledIconButtonProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Col gap={6} alignItems="center">
                <LabeledIconButtonButton variant={variant}>
                    <ElementStyler style={{ fontSize: 24 }}>{children}</ElementStyler>
                </LabeledIconButtonButton>
                <Placeholder variant="body3Strong">{label}</Placeholder>
            </Col>
        </TouchableWithoutFeedback>
    );
};

export default LabeledIconButton;
