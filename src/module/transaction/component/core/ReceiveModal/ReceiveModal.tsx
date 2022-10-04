import { Col, createBackdrop, ExposedBackdropProps, Typography, useToast } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import styled from "@peersyst/react-native-styled";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import Button from "module/common/component/input/Button/Button";
import * as Clipboard from "expo-clipboard";

const TextAddress = styled(Typography, { textTransform: "uppercase" })(() => ({
    width: "87%",
}));

const ReceiveModal = createBackdrop((props: ExposedBackdropProps) => {
    const t = useTranslate();
    const network = useSelectedNetwork();
    const { index } = useSelectedWallet();
    const serviceInstance = serviceInstancesMap.get(index)?.[network];
    const address = serviceInstance?.getAddress();
    const { showToast } = useToast();

    const copyToClipboard = () => {
        Clipboard.setString(address || "");
        showToast(t("address_copied"), { type: "success" });
    };

    return (
        <CardNavigatorModal navbar={{ back: true, title: t("receive") }} {...props}>
            <Col gap={"5%"} flex={1} alignItems="center" justifyContent="center">
                <QRCode />
                <Typography textAlign="center" variant="body2" style={{ marginTop: 25 }}>
                    {t("receive_info")}
                </Typography>
                <TextAddress variant="body1" textAlign="center">
                    {address}
                </TextAddress>
                <Button variant="primary" fullWidth onPress={() => copyToClipboard()} style={{ marginTop: 12 }}>
                    Copy
                </Button>
            </Col>
        </CardNavigatorModal>
    );
});

export default ReceiveModal;
