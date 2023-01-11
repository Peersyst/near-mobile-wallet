import { useState } from "react";
import ConfirmPinModal, { ConfirmPinScreenProps } from "./ConfirmPinModal";

export interface ConfirmPinModalWrapperPropsRenderProps {
    showConfirmPinModal: () => void;
    hideConfirmPinModal: () => void;
}

export type ConfirmPinModalWrapperProps = Omit<ConfirmPinScreenProps, "open" | "children"> & {
    children: (props: ConfirmPinModalWrapperPropsRenderProps) => JSX.Element;
};

export function ConfirmPinModalWrapper({ children, onPinConfirmed, onClose, ...rest }: ConfirmPinModalWrapperProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const handlePinConfirmed = () => {
        setOpen(false);
        onPinConfirmed();
    };

    const handleOnClose = () => {
        setOpen(false);
        onClose?.();
    };

    const showConfirmPinModal = () => setOpen(true);
    const hideConfirmPinModal = () => setOpen(false);

    return (
        <>
            {children({ showConfirmPinModal, hideConfirmPinModal })}
            <ConfirmPinModal {...rest} open={open} onPinConfirmed={handlePinConfirmed} onClose={handleOnClose} />
        </>
    );
}
