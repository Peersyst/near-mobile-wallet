import { Col, createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import Typography from "module/common/component/display/Typography/Typography";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import BlockchainAddressCard from "module/wallet/component/input/BlockchainAddressCard/BlockchainAddressCard";

const ReceiveModal = createBackdrop<ExposedBackdropProps>(({ close, ...rest }) => {
    const t = useTranslate();
    const { serviceInstance } = useServiceInstance();
    const address = serviceInstance?.getAddress();

    return (
        <CardNavigatorModal navbar={{ back: true, title: t("receive") }} {...rest}>
            <Col gap={24} flex={1} alignItems="center" justifyContent="flex-end">
                <QRCode />
                <Typography textAlign="center" variant="body3Regular" color={(palette) => palette.overlay["60%"]}>
                    {t("receive_info")}
                </Typography>
                <BlockchainAddressCard address={address} onCopy={close} mainButton />
            </Col>
        </CardNavigatorModal>
    );
});

export default ReceiveModal;
