import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Row, useModal } from "@peersyst/react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { capitalize } from "@peersyst/react-utils";

const WalletCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();

    return (
        <Row gap={8}>
            <Button style={{ width: 132 }} variant="secondary" size="md" onPress={() => showModal(SendModal)}>
                {capitalize(translate("send"))}
            </Button>
            <Button style={{ width: 132 }} variant="secondary" size="md" onPress={() => showModal(ReceiveModal)}>
                {capitalize(translate("receive"))}
            </Button>
        </Row>
    );
};

export default WalletCardButtons;
