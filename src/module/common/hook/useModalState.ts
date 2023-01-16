import { useState } from "react";

export interface BaseUseModalStateReturn {
    showModal: () => void;
    hideModal: () => void;
}

export interface UseModalStateReturn extends BaseUseModalStateReturn {
    open: boolean;
}

export function useModalState(): UseModalStateReturn {
    const [open, setOpen] = useState(false);
    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    return {
        open,
        showModal,
        hideModal,
    };
}
