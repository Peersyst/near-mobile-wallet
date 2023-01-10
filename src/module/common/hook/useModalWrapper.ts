import { useState } from "react";

export interface BaseUseModalWrapperReturn {
    showModal: () => void;
    hideModal: () => void;
}

export interface UseModalWrapperReturn extends BaseUseModalWrapperReturn {
    open: boolean;
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
