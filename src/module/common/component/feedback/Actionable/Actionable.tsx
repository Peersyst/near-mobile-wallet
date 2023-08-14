import { Col, RowProps } from "@peersyst/react-native-components";
import { ActionableRoot } from "./Actionable.styles";
import { ButtonProps } from "../../input/Button/Button.types";
import Button from "../../input/Button/Button";

type ActionablePosition = "left" | "right";

export interface ActionableProps extends RowProps {
    onAction: () => void;
    actionText: string;
    actionProps?: ButtonProps;
    position?: ActionablePosition;
}

const Actionable = ({ actionText, onAction, position = "right", actionProps, children, ...rest }: ActionableProps): JSX.Element => {
    const action: JSX.Element = (
        <Col justifyContent="center">
            <Button onPress={onAction} {...actionProps}>
                {actionText}
            </Button>
        </Col>
    );

    const [firstItem, secondItem] = position === "left" ? [action, children] : [children, action];

    return (
        <ActionableRoot {...rest}>
            {firstItem}
            <Col justifyContent="center">{secondItem}</Col>
        </ActionableRoot>
    );
};

export default Actionable;
