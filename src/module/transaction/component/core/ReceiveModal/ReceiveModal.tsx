import { Col, createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import Button from "module/common/component/input/Button/Button";
import Typography from "module/common/component/display/Typography/Typography";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useControlled } from "@peersyst/react-hooks";
import { useCopyToClipboard } from "module/common/hook/useCopyToClipboard";
import BlockchainAddressCard from "module/wallet/component/input/BlockchainAddressCard/BlockchainAddressCard";

const ReceiveModal = createBackdrop<ExposedBackdropProps>(({ close, open: openProp, onClose, ...rest }) => {
    const translate = useTranslate();
    const [open, setOpen] = useControlled(true, openProp, onClose);
    const { serviceInstance } = useServiceInstance();
    const address = serviceInstance?.getAddress();
    const copyToClipboard = useCopyToClipboard();

    const handlePress = () => {
        copyToClipboard({ message: address, toastMessage: translate("address_copied") });
        setOpen(false);
    };

    return (
        <CardNavigatorModal
            open={open}
            onClose={() => setOpen(false)}
            closable
            navbar={{ back: true, title: translate("receive")! }}
            {...rest}
        >
            <Col gap={24} flex={1} alignItems="center" justifyContent="flex-end">
                <QRCode />
                <Typography textAlign="center" variant="body3Regular" color={(palette) => palette.overlay["60%"]}>
                    {translate("receive_info")}
                </Typography>
                <BlockchainAddressCard address={address} />
                <Button variant="primary" fullWidth onPress={handlePress}>
                    {translate("copy")}
                </Button>
            </Col>
        </CardNavigatorModal>
    );
});

export default ReceiveModal;
