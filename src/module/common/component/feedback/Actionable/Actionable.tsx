import { Col } from "@peersyst/react-native-components";
import { ActionableRoot, ActionableIcon } from "./Actionable.styles";
import { ActionableProps } from "./Actionable.types";

const Actionable = ({ Action, onAction, position = "right", actionProps, children, ...rest }: ActionableProps): JSX.Element => {
    const action: JSX.Element = (
        <Col justifyContent="center">
            <ActionableIcon onPress={onAction} {...actionProps}>
                <Action />
            </ActionableIcon>
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
