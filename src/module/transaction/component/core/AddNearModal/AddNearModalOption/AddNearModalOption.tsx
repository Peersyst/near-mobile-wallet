import { Typography } from "@peersyst/react-native-components";
import { AddNearModalOptionContentIcon, AddNearModalOptionRoot } from "./AddNearModalOption.styles";
import { AddNearModalOptionProps } from "./AddNearModalOption.types";

const AddNearModalOption = ({ text, onPress, icon }: AddNearModalOptionProps): JSX.Element => {
    return (
        <AddNearModalOptionRoot onPress={onPress}>
            <AddNearModalOptionContentIcon>{icon}</AddNearModalOptionContentIcon>
            <Typography variant="body2Regular">{text}</Typography>
        </AddNearModalOptionRoot>
    );
};

export default AddNearModalOption;
