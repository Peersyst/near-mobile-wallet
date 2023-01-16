import { BaseUseModalStateReturn, useModalState } from "module/common/hook/useModalState";
import ConfirmPinModal, { ConfirmPinScreenProps } from "./ConfirmPinModal";

export type ConfirmPinModalWrapperProps = Omit<ConfirmPinScreenProps, "open" | "children"> & {
    children: (props: BaseUseModalStateReturn) => JSX.Element;
};

export function ConfirmPinModalWrapper({ children, onPinConfirmed, onClose, ...rest }: ConfirmPinModalWrapperProps): JSX.Element {
    const { open, showModal, hideModal } = useModalState();

    const handlePinConfirmed = () => {
        hideModal();
        onPinConfirmed();
    };

    const handleOnClose = () => {
        hideModal();
        onClose?.();
    };

    return (
        <>
            {children({ showModal, hideModal })}
            <ConfirmPinModal {...rest} open={open} onPinConfirmed={handlePinConfirmed} onClose={handleOnClose} />
        </>
    );
}
