import { SendIcon, ReceiveIcon } from "icons";
import { translate } from "locale";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { Row } from "react-native-components";
import { CardButton, Separator } from "./CardButtons.styles";

const CARD_BUTTON_ICON_SIZE = 20;

const CardButtons = (): JSX.Element => {
    const navigation = useNavigation();
    return (
        <Row justifyContent="center">
            <CardButton
                onPress={() => navigation.navigate(MainScreens.SEND)}
                position="left"
                leftIcon={<SendIcon style={{ fontSize: CARD_BUTTON_ICON_SIZE }} />}
            >
                {translate("send")}
            </CardButton>
            <Separator />
            <CardButton
                onPress={() => navigation.navigate(MainScreens.RECEIVE)}
                position="right"
                rightIcon={<ReceiveIcon style={{ fontSize: CARD_BUTTON_ICON_SIZE }} />}
            >
                {translate("receive")}
            </CardButton>
        </Row>
    );
};

export default CardButtons;
