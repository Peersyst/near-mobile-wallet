import styled from "@peersyst/react-native-styled";
import { translate } from "locale";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import Card from "module/common/component/surface/Card/Card";
import { Col, Row, Typography, useModal } from "react-native-components";
import GoBack from "../../navigation/GoBack";
import useWallet from "module/wallet/hook/useWallet";
import ReceiveModal from "../../core/ReceiveModal/ReceiveModal";

const ReceiveCardContent = styled(Col, { gap: "10%" })(() => ({
    paddingHorizontal: "4%",
    paddingBottom: "2%",
}));

const TextAddress = styled(Typography, { textTransform: "uppercase" })(() => ({
    width: "75%",
}));

const ReceiveCard = (): JSX.Element => {
    const {
        state: { cells, selectedAccount },
    } = useWallet();
    const address = selectedAccount !== undefined && cells[selectedAccount].address;
    const { hideModal } = useModal();

    return (
        <Card>
            <ReceiveCardContent>
                <Row justifyContent="space-between" alignItems="center">
                    <TextAddress variant="h3">{address}</TextAddress>
                    <CopyToClipboardIcon filled text={address || ""} toastMessage={translate("address_copied")} />
                </Row>
                <Typography variant={"caption"}>{translate("receive_info")}</Typography>
                <GoBack onBack={() => hideModal(ReceiveModal.id)} />
            </ReceiveCardContent>
        </Card>
    );
};

export default ReceiveCard;
