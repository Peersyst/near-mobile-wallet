import { Col } from "@peersyst/react-native-components";
import { ActionableRoot } from "./Actionable.styles";
import Button from "../../input/Button/Button";
import { ActionableProps } from "./Actionable.types";

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
            {secondItem}
        </ActionableRoot>
    );
};

export default Actionable;
