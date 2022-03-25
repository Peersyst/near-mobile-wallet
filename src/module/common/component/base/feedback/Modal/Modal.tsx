import { useCallback } from "react";
import { ModalProps } from "./Modal.types";
import { useControlled } from "@peersyst/react-hooks";
import { Backdrop } from "../Backdrop";
import { ModalRoot } from "./Modal.styles";

export default function Modal({
    closable = true,
    defaultOpen = true,
    open: propOpen,
    children,
    onClose,
    elevation = 16,
    style,
    ...rest
}: ModalProps): JSX.Element {
    const [open, setOpen] = useControlled(defaultOpen, propOpen, propOpen ? onClose : undefined);

    const handleClose = useCallback(() => {
        if (closable && open) {
            setOpen(false);
        }
    }, [closable, open, setOpen]);

    return (
        <Backdrop defaultOpen={defaultOpen} open={open} onClose={handleClose} closable={closable} {...rest}>
            <ModalRoot style={style} elevation={elevation}>
                {children}
            </ModalRoot>
        </Backdrop>
    );
}
