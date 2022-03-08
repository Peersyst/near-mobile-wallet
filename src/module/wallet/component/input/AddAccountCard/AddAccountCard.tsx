import { Alert, TouchableWithoutFeedback } from "react-native";
import { AddAccountCardRoot, AddIcon, AddText, ContentRoot } from "./AddAccountCard.style";
import { translate } from "locale";

const AddAccountCard = (): JSX.Element => {
    return (
        <AddAccountCardRoot>
            <ContentRoot>
                <AddIcon />
                <AddText variant="h3">{translate("add_an_account")}</AddText>
            </ContentRoot>
        </AddAccountCardRoot>
    );
};

export default AddAccountCard;
