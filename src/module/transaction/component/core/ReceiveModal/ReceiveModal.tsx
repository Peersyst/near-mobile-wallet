import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import Typography from "module/common/component/display/Typography/Typography";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useControlled } from "@peersyst/react-hooks";
import BlockchainAddressCard from "module/wallet/component/input/BlockchainAddressCard/BlockchainAddressCard";
import ShareButton from "module/common/component/input/ShareButton/ShareButton";
import useReceiveShareContent from "./useReceiveShareContent/useReceiveShareContent";
import { ReceiveModalWrapper } from "./ReceiveModal.styles";

const ReceiveModal = createBackdrop<ExposedBackdropProps>(({ open: openProp, onClose, defaultOpen = true, ...rest }) => {
    const translate = useTranslate();
    const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);
    const { serviceInstance } = useServiceInstance();
    const address = serviceInstance?.getAddress();
    const shareContent = useReceiveShareContent(address!);

    return (
        <CardNavigatorModal
            open={open}
            onClose={() => setOpen(false)}
            closable
            navbar={{ back: true, title: translate("receive")! }}
            {...rest}
        >
            <ReceiveModalWrapper gap={24}>
                <QRCode style={{ padding: 24 }} />
                <Typography textAlign="center" variant="body3Regular" color={(palette) => palette.overlay["60%"]}>
                    {translate("receive_info")}
                </Typography>
                <BlockchainAddressCard address={address} showCopyIcon />
                <ShareButton fullWidth shareContent={shareContent} showButton />
            </ReceiveModalWrapper>
        </CardNavigatorModal>
    );
});

export default ReceiveModal;
