import { Col } from "@peersyst/react-native-components";
import { Placeholder } from "../../display/PinDisplay/PinDisplay.styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import IconButton from "../IconButton/IconButton";
import { IconButtonProps } from "../IconButton/IconButton.types";

export interface LabeledIconButtonProps extends Omit<IconButtonProps, "onPress"> {
    label: string;
    onPress: () => void;
}

const LabeledIconButton = ({ label, children, variant, onPress }: LabeledIconButtonProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Col gap={6} alignItems="center">
                <IconButton variant={variant} style={{ fontSize: 24 }}>
                    {children}
                </IconButton>
                <Placeholder variant="body3Strong">{label}</Placeholder>
            </Col>
        </TouchableWithoutFeedback>
    );
};

export default LabeledIconButton;
