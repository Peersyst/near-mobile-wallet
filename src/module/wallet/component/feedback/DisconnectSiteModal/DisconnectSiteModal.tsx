import { createModal } from "@peersyst/react-native-components";
import { DisconnectSiteModalProps } from "./DisconnectSiteModal.types";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useControlled } from "@peersyst/react-hooks";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";

const DisconnectSiteModal = createModal(
    ({ site, defaultOpen, open: openProp, onClose, ...modalProps }: DisconnectSiteModalProps): JSX.Element => {
        const translate = useTranslate();
        const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);

        return (
            <CardNavigatorModal
                open={open}
                navbar={{ back: true, onBack: () => setOpen(false), title: translate("connectedWith", { name: site.name }).toUpperCase() }}
                style={{ height: "90%" }}
                {...modalProps}
            >
                <Typography variant="body2Strong">{site.name}</Typography>
            </CardNavigatorModal>
        );
    },
);

export default DisconnectSiteModal;
