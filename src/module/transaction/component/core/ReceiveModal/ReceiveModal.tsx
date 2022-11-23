import { Col, createBackdrop, ExposedBackdropProps, useToast } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import Button from "module/common/component/input/Button/Button";
import * as Clipboard from "expo-clipboard";
import Container from "module/common/component/display/Container/Container";
import Typography from "module/common/component/display/Typography/Typography";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

const ReceiveModal = createBackdrop<ExposedBackdropProps>(({ close, ...rest }) => {
    const t = useTranslate();
    const { serviceInstance } = useServiceInstance();
    const address = serviceInstance?.getAddress();
    const { showToast } = useToast();

    const copyToClipboard = () => {
        Clipboard.setString(address || "");
        showToast(t("address_copied"), { type: "success" });
        close();
    };

    return (
        <CardNavigatorModal navbar={{ back: true, title: t("receive") }} {...rest}>
            <Col gap={24} flex={1} alignItems="center" justifyContent="flex-end">
                <QRCode />
                <Typography textAlign="center" variant="body3Regular" color={(palette) => palette.overlay["60%"]}>
                    {t("receive_info")}
                </Typography>
                <Container>
                    <Typography variant="body2Strong" textAlign="center" textTransform="uppercase">
                        {address}
                    </Typography>
                </Container>
                <Button variant="primary" fullWidth onPress={copyToClipboard}>
                    {t("copy")}
                </Button>
            </Col>
        </CardNavigatorModal>
    );
});

export default ReceiveModal;
