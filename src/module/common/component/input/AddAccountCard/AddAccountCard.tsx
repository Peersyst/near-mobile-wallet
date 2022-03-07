import { Alert, TouchableWithoutFeedback } from "react-native";
import { AddAccountCardRoot, AddIcon, AddText, ContentRoot } from "./AddAccountCard.style";
import { translate } from "locale";

const AddAccountCard = (): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={() => Alert.alert("IMPORT_WALLET")}>
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
