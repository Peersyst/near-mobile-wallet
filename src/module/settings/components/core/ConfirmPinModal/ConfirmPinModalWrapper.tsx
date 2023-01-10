import { BaseUseModalWrapperReturn, useModalWrapper } from "module/common/hook/useModalWrapper";
import ConfirmPinModal, { ConfirmPinScreenProps } from "./ConfirmPinModal";

export type ConfirmPinModalWrapperProps = Omit<ConfirmPinScreenProps, "open" | "children"> & {
    children: (props: BaseUseModalWrapperReturn) => JSX.Element;
};

export function ConfirmPinModalWrapper({ children, onPinConfirmed, onClose, ...rest }: ConfirmPinModalWrapperProps): JSX.Element {
    const { open, showModal, hideModal } = useModalWrapper();

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
