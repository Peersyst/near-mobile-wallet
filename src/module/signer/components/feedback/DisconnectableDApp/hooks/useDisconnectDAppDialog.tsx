import { Dialog } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";

interface UseDisconnectDAppDialogProps {
    onDisconnect?: () => void;
    disconnecting?: boolean;
    onCancel?: () => void;
}

export default function useDisconnectDAppDialog({ onDisconnect, onCancel, disconnecting = false }: UseDisconnectDAppDialogProps) {
    const translate = useTranslate();

    const [openDialog, setOpenDialog] = useState(false);

    const hideDialog = () => setOpenDialog(false);

    const handleCancel = () => {
        onCancel?.();
        hideDialog();
    };

    const dialogButtons = [
        {
            action: onDisconnect,
            text: translate("disconnect"),
            type: "destructive",
            loading: disconnecting,
        },
        {
            action: handleCancel,
            text: translate("cancel"),
            type: "default",
            variant: "text",
            disabled: disconnecting,
        },
    ];

    return {
        showDialog: () => setOpenDialog(true),
        hideDialog,
        dialog: (
            <Dialog open={openDialog} title={translate("disconnect")} content={translate("confirmDisconnect")} buttons={dialogButtons} />
        ),
    };
}
