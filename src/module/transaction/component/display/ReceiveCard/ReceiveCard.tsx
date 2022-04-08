import styled from "@peersyst/react-native-styled";
import { translate } from "locale";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import Card from "module/common/component/surface/Card/Card";
import { Col, Row, Typography, useModal } from "react-native-components";
import GoBack from "../../navigation/GoBack";
import ReceiveModal from "../../core/ReceiveModal/ReceiveModal";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { serviceInstancesMap } from "module/common/query/useLoad";

const ReceiveCardContent = styled(Col, { justifyContent: "space-between" })(({ dimensions }) => ({
    height: dimensions.height * 0.25,
    paddingHorizontal: "2%",
    paddingBottom: dimensions.height * 0.005,
}));

const TextAddress = styled(Typography, { textTransform: "uppercase" })(() => ({
    width: "87%",
}));

const ReceiveCard = (): JSX.Element => {
    const { index } = useSelectedWallet();
    const serviceInstance = serviceInstancesMap.get(index);
    const address = serviceInstance?.getAddress();
    const { hideModal } = useModal();

    return (
        <Card>
            <ReceiveCardContent>
                <Row justifyContent="space-between" alignItems="center">
                    <TextAddress variant="h3">{address}</TextAddress>
                    <CopyToClipboardIcon filled text={address || ""} toastMessage={translate("address_copied")} />
                </Row>
                <Typography variant="body2">{translate("receive_info")}</Typography>
                <GoBack onBack={() => hideModal(ReceiveModal.id)} />
            </ReceiveCardContent>
        </Card>
    );
};

export default ReceiveCard;
