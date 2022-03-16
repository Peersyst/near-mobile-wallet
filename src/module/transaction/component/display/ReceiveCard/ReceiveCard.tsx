import styled from "@peersyst/react-native-styled";
import { translate } from "locale";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import Card from "module/common/component/surface/Card/Card";
import { Col, Row, Typography, useModal } from "react-native-components";
import GoBack from "../../navigation/GoBack";
import useWallet from "module/wallet/hook/useWallet";
import ReceiveModal from "../../core/ReceiveModal/ReceiveModal";

const ReceiveCardContent = styled(Col, { justifyContent: "space-between" })(({ dimensions }) => ({
    height: dimensions.height * 0.25,
    paddingHorizontal: "2%",
    paddingBottom: dimensions.height * 0.005
}));

const TextAddress = styled(Typography, { textTransform: "uppercase" })(() => ({
    width: "87%",
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
                    <TextAddress variant="body1">{address}</TextAddress>
                    <CopyToClipboardIcon filled text={address || ""} toastMessage={translate("address_copied")} />
                </Row>
                <Typography variant={"caption"}>{translate("receive_info")}</Typography>
                <GoBack onBack={() => hideModal(ReceiveModal.id)} />
            </ReceiveCardContent>
        </Card>
    );
};

export default ReceiveCard;
