import Dialog from "../Dialog";
import { DialogProps } from "../Dialog.types";
import { useModal } from "../../ModalProvider";

export interface UseDialogResult {
    showDialog: (props: DialogProps) => void;
    hideDialog: () => void;
    isDialogOpen: () => boolean;
}

export default function (): UseDialogResult {
    const { showModal, hideModal, isModalActive } = useModal();

    const showDialog = (props: DialogProps): void => showModal(Dialog, props);
    const hideDialog = (): void => hideModal(Dialog.id);
    const isDialogOpen = (): boolean => isModalActive(Dialog.id);

    return { showDialog, hideDialog, isDialogOpen };
}
