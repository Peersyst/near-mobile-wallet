import { LoadingModalProps } from "./LoadingModal.types";
import { DarkLoadingModalOverlay, LoadingModalRoot, SuccessIcon, LoadingModalContent, LoadingModalMessage } from "./LoadingModal.styles";
import { useEffect, useState } from "react";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useTranslate } from "module/common/hook/useTranslate";
import LinearLogo from "module/common/component/display/LinearBgLogo/LinearBgLogo";
import { Backdrop, Col, useTheme } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import Logo from "../../display/Logo/Logo";

const LoadingModal = ({ loading, successMessage, error, success, ...backdropProps }: LoadingModalProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const translate = useTranslate();

    const { palette } = useTheme();
    const white = palette.white;
    const logoGradient = palette.mode === "dark" ? palette.gradient.blueTurquoise : [white, white];

    useEffect(() => {
        if (!open) setOpen(loading || success || error);
        else if (error) setOpen(false);
    }, [loading, success, error]);

    useEffect(() => {
        if (success) {
            notificationAsync(NotificationFeedbackType.Success);
        }
    }, [success]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Backdrop
            open={open}
            closable={success}
            swipeable={false}
            onClose={handleClose}
            animationIn="fadeIn"
            animationOut="fadeOut"
            closeOnBackdropTap={false}
            {...backdropProps}
        >
            <LoadingModalRoot>
                <DarkLoadingModalOverlay />
                <LoadingModalContent>
                    {success ? (
                        <>
                            <Col alignItems="center" gap={14}>
                                <SuccessIcon />
                                <LoadingModalMessage textAlign="center" variant="body2Strong">
                                    {successMessage}
                                </LoadingModalMessage>
                            </Col>
                            <Button fullWidth variant="secondary" onPress={handleClose}>
                                {translate("continue")}
                            </Button>
                        </>
                    ) : (
                        <Col alignItems="center" gap={14}>
                            <Logo />
                            <LoadingModalMessage textAlign="center" variant="body2Strong">
                                {translate("processing")}
                            </LoadingModalMessage>
                        </Col>
                    )}
                </LoadingModalContent>
            </LoadingModalRoot>
        </Backdrop>
    );
};
export default LoadingModal;
