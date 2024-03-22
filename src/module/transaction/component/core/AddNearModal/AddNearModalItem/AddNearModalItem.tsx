import { Row, Typography } from "@peersyst/react-native-components";
import { ReactElement } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { AddNearModalItemContentIcon } from "./AddNearModalItem.styles";

export interface AddNearModalItemProps {
    text: string;
    icon: ReactElement;
    onPress: () => void;
}

const AddNearModalItem = ({ text, onPress, icon }: AddNearModalItemProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={"button"}>
            <Row gap={12}>
                <AddNearModalItemContentIcon>{icon}</AddNearModalItemContentIcon>
                <Typography variant="body2Regular">{text}</Typography>
            </Row>
        </TouchableWithoutFeedback>
    );
};

export default AddNearModalItem;
