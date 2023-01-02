import { WrapperModalBaseChildrenProps } from "module/common/component/feedback/WrapperModal/WrapperModal";
import { useState } from "react";
import ConfirmPinModal, { ConfirmPinScreenProps } from "./ConfirmPinModal";

export type ConfirmPinModalWrapperProps = Omit<ConfirmPinScreenProps, "open" | "children"> & {
    children: (props: WrapperModalBaseChildrenProps) => JSX.Element;
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

    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    return (
        <>
            {children({ showModal, hideModal })}
            <ConfirmPinModal {...rest} open={open} onPinConfirmed={handlePinConfirmed} onClose={handleOnClose} />
        </>
    );
}
