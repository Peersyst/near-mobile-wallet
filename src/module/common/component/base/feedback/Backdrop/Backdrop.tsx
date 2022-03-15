import { useCallback, useRef } from "react";
import { BackdropProps } from "./Backdrop.types";
import { useControlled } from "@peersyst/react-hooks";
import { BackdropRoot } from "./Backdrop.styles";
import { Animated } from "../../util/Animated";
import useAnimatedTiming from "module/common/component/base/util/Animated/hooks/useAnimatedTiming";
import { useTheme } from "@peersyst/react-native-styled";
import { classify } from "@peersyst/react-utils";

const AnimatedBackdropRoot = Animated.createAnimatedComponent(classify(BackdropRoot));

export default function Backdrop({
    closable = true,
    defaultOpen = true,
    open: propsOpen,
    onClose,
    onExited,
    transparent = false,
    transitionsDuration = 400,
    style,
    children,
}: BackdropProps): JSX.Element {
    const [open, setOpen] = useControlled(defaultOpen, propsOpen, propsOpen ? onClose : undefined);

    const handleClose = useCallback(() => {
        if (closable && open) {
            setOpen(false);
        }
    }, [closable, open, setOpen]);

    const { palette } = useTheme();
    const backdropAnim = useRef(new Animated.Value(open ? 0 : 1)).current;
    const backdropColor = backdropAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["transparent", transparent ? "transparent" : palette.backdrop],
    });
    const { mounted } = useAnimatedTiming(open, backdropAnim, {
        toValue: { enter: 1, exit: 0 },
        duration: transitionsDuration,
        delay: 0,
        unmountOnExit: false,
        onExit: onClose,
        onExited,
    });

    return mounted ? (
        <AnimatedBackdropRoot onTouchEnd={handleClose} style={{ ...style, backgroundColor: backdropColor }}>
            {children}
        </AnimatedBackdropRoot>
    ) : (
        <></>
    );
}
