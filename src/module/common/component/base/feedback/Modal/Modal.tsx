import { useCallback } from "react";
import { ModalProps } from "./Modal.types";
import { useControlled } from "@peersyst/react-hooks";
import { Backdrop, ForwardedBackdropProps } from "../Backdrop";
import { ModalRoot } from "./Modal.styles";
import { Animated } from "../../util/Animated";

const FadingModal = Animated.createAnimatedComponent.fade(ModalRoot);
const SlidingModal = Animated.createAnimatedComponent.slide(ModalRoot, { direction: "up" });

export default function Modal({
    closable = true,
    defaultOpen = true,
    open: propOpen,
    children,
    onClose,
    onExited,
    transitionsDuration = 300,
    animation = "fade",
    elevation = 16,
    BackdropProps,
    style,
}: ModalProps): JSX.Element {
    const [open, setOpen] = useControlled(defaultOpen, propOpen, propOpen ? onClose : undefined);

    const handleClose = useCallback(() => {
        if (closable && open) {
            setOpen(false);
        }
    }, [closable, open, setOpen]);

    const AnimatedModalRoot = animation === "fade" ? FadingModal : SlidingModal;

    const forwardedBackdropProps: ForwardedBackdropProps = {
        defaultOpen,
        open,
        onClose: handleClose,
        onExited,
        closable,
    };

    return (
        <Backdrop {...BackdropProps} {...forwardedBackdropProps}>
            <AnimatedModalRoot
                in={open}
                appear
                duration={transitionsDuration}
                style={style}
                onTouchStart={(e) => e.stopPropagation()}
                elevation={elevation}
            >
                {children}
            </AnimatedModalRoot>
        </Backdrop>
    );
}
