import { Col } from "@peersyst/react-native-components";
import { ActionableRoot } from "./Actionable.styles";
import { ActionableProps } from "./Actionable.types";

const Actionable = ({ action: actionProp, position = "right", children, ...rest }: ActionableProps): JSX.Element => {
    const action: JSX.Element = <Col justifyContent="center">{actionProp}</Col>;

    const [firstItem, secondItem] = position === "left" ? [action, children] : [children, action];

    return (
        <ActionableRoot {...rest}>
            {firstItem}
            {secondItem}
        </ActionableRoot>
    );
};

export default Actionable;
