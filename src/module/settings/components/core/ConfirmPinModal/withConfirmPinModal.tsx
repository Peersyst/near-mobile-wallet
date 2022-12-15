import { ComponentType, useState } from "react";
import { ConfirmPinProvider } from "./ConfirmPinContext";
import ConfirmPinModal, { ConfirmPinScreenProps } from "./ConfirmPinModal";

export function withPinConfirmedModal<TProps = {}>(
    WrappedComponent: ComponentType<TProps>,
    { onPinConfirmed, ...confirmPinModalProps }: ConfirmPinScreenProps,
): ComponentType<TProps> {
    const [open, setOpen] = useState(false);

    const handlePinConfirmed = () => {
        setOpen(false);
        onPinConfirmed();
    };

    const showConfirmPinModal = () => setOpen(true);
    const hideConfirmPinModal = () => setOpen(false);

    return (props: TProps) => {
        return (
            <ConfirmPinProvider value={{ open, showConfirmPinModal, hideConfirmPinModal }}>
                <WrappedComponent {...(props as any)} />
                <ConfirmPinModal open={open} onPinConfirmed={handlePinConfirmed} {...confirmPinModalProps} />
            </ConfirmPinProvider>
        );
    };
}
