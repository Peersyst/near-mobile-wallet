import { useCallback } from "react";
import { ModalProps } from "./Modal.types";
import { useControlled } from "@peersyst/react-hooks";
import { Backdrop } from "../Backdrop";
import { CloseButton, ModalRoot } from "./Modal.styles";
import { useTheme } from "@peersyst/react-native-styled";

export default function Modal({
    closable = true,
    showCloseButton = false,
    defaultOpen = true,
    open: propOpen,
    children,
    onClose,
    elevation = 16,
    style,
    ...rest
}: ModalProps): JSX.Element {
    const [open, setOpen] = useControlled(defaultOpen, propOpen, propOpen ? onClose : undefined);
    const {
        icons: { cross: CrossIcon },
    } = useTheme();

    const handleClose = useCallback(() => {
        if (closable && open) {
            setOpen(false);
        }
    }, [closable, open, setOpen]);

    return (
        <Backdrop defaultOpen={defaultOpen} open={open} onClose={handleClose} closable={closable} {...rest}>
            <ModalRoot style={style} elevation={elevation}>
                {children}
                {closable && showCloseButton && (
                    <CloseButton onPress={handleClose}>
                        <CrossIcon />
                    </CloseButton>
                )}
            </ModalRoot>
        </Backdrop>
    );
}
