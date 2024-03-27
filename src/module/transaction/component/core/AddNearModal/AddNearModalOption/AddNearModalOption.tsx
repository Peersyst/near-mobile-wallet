import { Row, Typography } from "@peersyst/react-native-components";
import { TouchableWithoutFeedback } from "react-native";
import { AddNearModalOptionContentIcon } from "./AddNearModalOption.styles";
import { AddNearModalOptionProps } from "./AddNearModalOption.types";

const AddNearModalOption = ({ text, onPress, icon }: AddNearModalOptionProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={"button"}>
            <Row gap={12}>
                <AddNearModalOptionContentIcon>{icon}</AddNearModalOptionContentIcon>
                <Typography variant="body2Regular">{text}</Typography>
            </Row>
        </TouchableWithoutFeedback>
    );
};

export default AddNearModalOption;
