import { useState } from "react";

export interface UseModalWrapperReturn {
    open: boolean;
    showModal: () => void;
    hideModal: () => void;
}

export function useModalWrapper(): UseModalWrapperReturn {
    const [open, setOpen] = useState(false);
    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    return {
        open,
        showModal,
        hideModal,
    };
}
