import { ExposedBackdropProps } from "@peersyst/react-native-components";
import React from "react";
import { ReactElement, useState } from "react";

export interface WrapperModalBaseChildrenProps {
    showModal: () => void;
    hideModal: () => void;
}

export interface WrapperModalProps<MP extends ExposedBackdropProps> {
    Modal: ReactElement<MP>;
    children: (props: WrapperModalBaseChildrenProps) => JSX.Element;
}

function WrapperModal<MP extends ExposedBackdropProps>({ children, Modal }: WrapperModalProps<MP>) {
    const [open, setOpen] = useState(false);

    const handleOnClose = () => {
        setOpen(false);
        Modal.props.onClose?.();
    };

    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    return (
        <>
            {children({ showModal, hideModal })}
            {React.cloneElement(Modal, { open, onClose: handleOnClose, ...Modal.props })}
        </>
    );
}

export default WrapperModal;
