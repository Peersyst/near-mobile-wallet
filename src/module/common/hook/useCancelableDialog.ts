import { DialogProps, useDialog } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";

interface UseCancelableDialogReturn {
    showCancelableDialog: (props: DialogProps) => void;
    hideCancelableDialog: () => void;
}

export default function (): UseCancelableDialogReturn {
    const { showDialog, hideDialog, ...restDialog } = useDialog();
    const translate = useTranslate();

    const showCancelableDialog = ({ buttons, ...rest }: DialogProps) => {
        const cancelableButtons = buttons;
        cancelableButtons?.push({ type: "default", text: translate("cancel"), variant: "text" });

        showDialog({
            ...rest,
            buttons: cancelableButtons,
        });
    };
    return { showCancelableDialog, hideCancelableDialog: hideDialog, ...restDialog };
}
