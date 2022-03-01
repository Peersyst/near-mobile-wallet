import { useModal, ModalContextType } from "../../ModalProvider";

export interface UseBackdropResult {
    showBackdrop: ModalContextType["showModal"];
    hideBackdrop: ModalContextType["hideModal"];
    isBackdropActive: ModalContextType["isModalActive"];
}

export function useBackdrop(): UseBackdropResult {
    const { showModal, hideModal, isModalActive } = useModal();
    return {
        showBackdrop: showModal,
        hideBackdrop: hideModal,
        isBackdropActive: isModalActive,
    };
}
