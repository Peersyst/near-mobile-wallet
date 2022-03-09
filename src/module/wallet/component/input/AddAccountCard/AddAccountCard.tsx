import { translate } from "locale";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { AddAccountCardRoot, AddIcon, AddText, ContentRoot } from "./AddAccountCard.style";

const AddAccountCard = (): JSX.Element => {
    const handleOnPress = () => {
        Alert.alert("Add account");
    };
    return (
        <TouchableWithoutFeedback onPress={handleOnPress}>
            <AddAccountCardRoot>
                <ContentRoot>
                    <AddIcon />
                    <AddText variant="h3">{translate("add_an_account")}</AddText>
                </ContentRoot>
            </AddAccountCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default AddAccountCard;
