import { ReactElement } from "react";
import { ModalProps } from "react-native-modal";

export interface BackdropProps {
    /**
     * Content in animation
     */
    animationIn?: ModalProps["animationIn"] | "none";
    /**
     * Animation in timing
     */
    animationInTiming?: ModalProps["animationInTiming"];
    /**
     * Content out animation
     */
    animationOut?: ModalProps["animationOut"] | "none";
    /**
     * Animation out timing
     */
    animationOutTiming?: ModalProps["animationOutTiming"];
    /**
     * Whether the backdrop should be rendered
     */
    renderBackdrop?: ModalProps["hasBackdrop"];
    /**
     * Backdrop color
     */
    backdropColor?: ModalProps["backdropColor"];
    /**
     * Backdrop opacity
     */
    backdropOpacity?: ModalProps["backdropOpacity"];
    /**
     * Backdrop in timing
     */
    backdropTransitionInTiming?: ModalProps["backdropTransitionInTiming"];
    /**
     * Backdrop out timing
     */
    backdropTransitionOutTiming?: ModalProps["backdropTransitionOutTiming"];
    /**
     * Backdrop is open
     */
    open?: ModalProps["isVisible"];
    /**
     * Backdrop is open on mount
     */
    defaultOpen?: boolean;
    /**
     * Backdrop is closable
     */
    closable?: boolean;
    /**
     * onClose handler
     */
    onClose?: ModalProps["onModalWillHide"];
    /**
     * onExited handler
     */
    onExited?: ModalProps["onModalHide"];
    /**
     * onOpen handler
     */
    onOpen?: ModalProps["onModalWillShow"];
    /**
     * onEntered handler
     */
    onEntered?: ModalProps["onModalShow"];
    /**
     * onSwipeStart handler
     */
    onSwipeStart?: ModalProps["onSwipeStart"];
    /**
     * onSwipeMove handler
     * Called on each swipe event
     */
    onSwipeMove?: ModalProps["onSwipeMove"];
    /**
     * onSwipeCancel handler
     */
    onSwipeCancel?: ModalProps["onSwipeCancel"];
    /**
     * PanResponder threshold
     * The threshold for when the panResponder should pick up swipe events
     */
    panResponderThreshold?: ModalProps["panResponderThreshold"];
    /**
     * Backdrop can be closed by swiping its content
     */
    swipeable?: boolean;
    /**
     * Swipe threshold
     * Swiping threshold that when reached closes the backdrop
     */
    swipeThreshold?: ModalProps["swipeThreshold"];
    /**
     * Swipe direction
     */
    swipeDirection?: ModalProps["swipeDirection"];
    /**
     * Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
     */
    propagateSwipe?: ModalProps["propagateSwipe"];
    /**
     * Backdrop style
     */
    style?: ModalProps["style"];
    /**
     * Backdrop content
     */
    children?: ReactElement | ((open: boolean, setOpen: (value: boolean) => unknown) => ReactElement);
}

export type ExposedBackdropProps = Omit<BackdropProps, "children" | "style">;
