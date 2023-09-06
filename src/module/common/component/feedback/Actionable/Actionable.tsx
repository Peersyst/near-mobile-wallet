import { Row } from "@peersyst/react-native-components";
import { ActionableProps } from "./Actionable.types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActionRoot } from "./Actionable.styles";

const Actionable = ({ action: actionProp, onAction, position = "right", children, ...rest }: ActionableProps): JSX.Element => {
    const action: JSX.Element = <ActionRoot>{actionProp}</ActionRoot>;

    const [firstItem, secondItem] = position === "left" ? [action, children] : [children, action];

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onAction}>
            <Row justifyContent="center" alignItems="center" {...rest}>
                {firstItem}
                {secondItem}
            </Row>
        </TouchableOpacity>
    );
};

export default Actionable;
