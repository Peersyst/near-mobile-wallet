import { useEffect } from "react";
import { ToastAction, ToastContent } from "./Toast.styles";
import { ToastProps } from "./Toast.types";
import { useControlled } from "@peersyst/react-hooks";
import { useGetIcon } from "./hooks/useGetIcon";
import { useTheme } from "@peersyst/react-native-styled";
import { Row } from "../../layout/Row";
import { AnimatedProps, Col, Icon } from "react-native-components";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useToastStyles from "module/common/component/base/feedback/Toast/hooks/useToastStyles";
import getAnimatedComponent from "module/common/component/base/feedback/Toast/utils/getAnimatedComponent";
import { SlideProps } from "module/common/component/base/util/Animated/Slide";

export default function Toast({
    message,
    type,
    action,
    position: positionProp,
    open: propOpen,
    onClose,
    onExited,
    animation: animationProp,
    duration = 4000,
    style,
}: ToastProps): JSX.Element {
    const { toastAnimation, toastPosition } = useTheme();
    const animation = animationProp || toastAnimation;
    const position = positionProp || toastPosition;
    const safeAreaInsets = useSafeAreaInsets();

    const [open, setOpen] = useControlled(true, propOpen, propOpen ? onClose : undefined);

    const { text: textStyle, container: containerContainer } = useToastStyles(style || {}, type);
    const icon = useGetIcon(type);

    useEffect(() => {
        if (open && (!type || type !== "loading")) {
            const hideTimeout = setTimeout(() => setOpen(false), duration);
            return () => {
                clearTimeout(hideTimeout);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const AnimatedComponent = getAnimatedComponent(animation);
    const animatedProps: AnimatedProps | SlideProps = {
        in: open,
        appear: true,
        duration: 200,
        onExited,
        ...((animation === "slide" || animation === "fadingSlide") && { direction: position === "top" ? "down" : "up" }),
    };

    return (
        <AnimatedComponent {...animatedProps} position={position} safeAreaInsets={safeAreaInsets}>
            <ToastContent type={type} style={containerContainer} elevation={5}>
                <Col flex={1}>
                    <Row flex={1} alignItems="center" gap={10}>
                        {icon && (
                            <Row>
                                <Icon style={textStyle}>{icon}</Icon>
                            </Row>
                        )}
                        <Row flex={1}>
                            <Text style={textStyle} lineBreakMode="head">
                                {message}
                            </Text>
                        </Row>
                    </Row>
                    {action && <ToastAction style={textStyle}>{action}</ToastAction>}
                </Col>
            </ToastContent>
        </AnimatedComponent>
    );
}
