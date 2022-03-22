import { SendIcon, ReceiveIcon } from "icons";
import { translate } from "locale";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Row, useModal } from "react-native-components";
import { CardButton, Separator } from "./CardButtons.styles";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";

const CARD_BUTTON_ICON_SIZE = 18;

const CardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    return (
        <Row justifyContent="center">
            <CardButton
                onPress={() => showModal(SendModal)}
                position="left"
                leftIcon={<SendIcon style={{ fontSize: CARD_BUTTON_ICON_SIZE }} />}
            >
                {translate("send")}
            </CardButton>
            <Separator />
            <CardButton
                onPress={() => showModal(ReceiveModal)}
                position="right"
                rightIcon={<ReceiveIcon style={{ fontSize: CARD_BUTTON_ICON_SIZE }} />}
            >
                {translate("receive")}
            </CardButton>
        </Row>
    );
};

export default CardButtons;
