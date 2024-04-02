import { Col, Dialog, createModal } from "@peersyst/react-native-components";
import { DisconnectSiteModalProps } from "./DisconnectSiteModal.types";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useControlled } from "@peersyst/react-hooks";
import useTranslate from "module/common/hook/useTranslate";
import DisconnectSiteDetails from "module/signer/components/display/DisconnectSiteDetails/DisconnectSiteDetails";
import Button from "module/common/component/input/Button/Button";
import Typography from "module/common/component/display/Typography/Typography";
import { useState } from "react";
import useDeleteKey from "module/signer/queries/useDeleteKey";

const DisconnectSiteModal = createModal(
    ({ site, defaultOpen, open: openProp, onClose, ...modalProps }: DisconnectSiteModalProps): JSX.Element => {
        const translate = useTranslate();
        const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);
        const [openDialog, setOpenDialog] = useState(false);

        const handleClose = () => setOpen(false);
        const handleDisconnect = () => setOpenDialog(true);

        const closeDialog = () => setOpenDialog(false);

        const handleSuccess = () => {
            closeDialog();
            handleClose();
        };

        const { mutate: deleteSite, isLoading } = useDeleteKey({ onSuccess: handleSuccess });

        return (
            <CardNavigatorModal
                open={open}
                navbar={{
                    back: true,
                    onBack: () => setOpen(false),
                    title: translate("connectedWith", { name: site.name }).toUpperCase(),
                }}
                style={{ height: "90%" }}
                {...modalProps}
            >
                <Col flex={1}>
                    <Col style={{ position: "absolute", height: "100%", width: "100%" }}>
                        <Col flex={1} gap={28} justifyContent="space-between">
                            <DisconnectSiteDetails site={site} />
                            <Col gap={16}>
                                <Button variant="text" fullWidth onPress={handleClose}>
                                    {translate("cancel")}
                                </Button>
                                <Button variant="destructive" fullWidth onPress={handleDisconnect}>
                                    {translate("disconnect")}
                                </Button>
                            </Col>
                        </Col>
                    </Col>
                </Col>
                <Dialog
                    open={openDialog}
                    content={
                        <Typography variant="body2Strong" textAlign="center" style={{ marginBottom: 24 }}>
                            {translate("deleteKeyConfirmation", { name: site.name })}
                        </Typography>
                    }
                    onExited={closeDialog}
                    buttons={[
                        {
                            type: "destructive",
                            text: translate("disconnect"),
                            action: () => deleteSite(site.accessKey.public_key),
                            loading: isLoading,
                        },
                        {
                            variant: "text",
                            action: closeDialog,
                            text: translate("cancel"),
                        },
                    ]}
                />
            </CardNavigatorModal>
        );
    },
);

export default DisconnectSiteModal;
