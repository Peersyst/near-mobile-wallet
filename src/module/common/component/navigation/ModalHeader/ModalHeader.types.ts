import { ReactElement } from "react";

export type ModalHeaderDismissal = "hide" | "close";

export interface ModalHeaderProps {
    title: ReactElement | string | number;
    dismissal: ModalHeaderDismissal;
    onDismiss: () => void;
    onBack?: () => void;
}
