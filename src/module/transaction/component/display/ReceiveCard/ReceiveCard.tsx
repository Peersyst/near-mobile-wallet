import styled from "@peersyst/react-native-styled";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import Card from "module/common/component/surface/Card/Card";
import { Col, Row, Typography, useModal } from "@peersyst/react-native-components";
import GoBack from "../../navigation/GoBack";
import ReceiveModal from "../../core/ReceiveModal/ReceiveModal";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { useTranslate } from "module/common/hook/useTranslate";

const ReceiveCardContent = styled(Col, { justifyContent: "space-between" })(({ dimensions }) => ({
    height: dimensions.height * 0.3,
    paddingHorizontal: "2%",
    paddingBottom: dimensions.height * 0.005,
}));

const TextAddress = styled(Typography, { textTransform: "uppercase" })(() => ({
    width: "87%",
}));

const ReceiveCard = (): JSX.Element => {
    const translate = useTranslate();
    const network = useSelectedNetwork();
    const { index } = useSelectedWallet();
    const serviceInstance = serviceInstancesMap.get(index)?.[network];
    const address = serviceInstance?.getAddress();
    const { hideModal } = useModal();

    return (
        <Card>
            <ReceiveCardContent>
                <Row justifyContent="space-between" alignItems="center">
                    <TextAddress variant="body1">{address}</TextAddress>
                    <CopyToClipboardIcon filled text={address || ""} toastMessage={translate("address_copied")} />
                </Row>
                <Typography textAlign="center" variant="body2">
                    {translate("receive_info")}
                </Typography>
                <GoBack onBack={() => hideModal(ReceiveModal.id)} />
            </ReceiveCardContent>
        </Card>
    );
};

export default ReceiveCard;
