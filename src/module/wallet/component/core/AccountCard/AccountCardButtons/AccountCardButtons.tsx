import { SendIcon, ReceiveIcon } from "icons";
import { translate } from "locale";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { useModal } from "react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import CardButtons from "module/common/component/input/CardButtons/CardButtons";

const CARD_BUTTON_ICON_SIZE = 18;

const AccountCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    return (
        <CardButtons
            //Left button props
            leftLabel={translate("send")}
            leftIcon={<SendIcon style={{ fontSize: CARD_BUTTON_ICON_SIZE }} />}
            leftButtonOnPress={() => showModal(SendModal)}
            //Right button props
            rightLabel={translate("receive")}
            rightIcon={<ReceiveIcon style={{ fontSize: CARD_BUTTON_ICON_SIZE }} />}
            rightButtonOnPress={() => showModal(ReceiveModal)}
        />
    );
};

export default AccountCardButtons;
