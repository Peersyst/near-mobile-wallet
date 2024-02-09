import { LoadingModalProps } from "./LoadingModal.types";
import { DarkLoadingModalOverlay, LoadingModalRoot, SuccessIcon, LoadingModalContent, LoadingModalMessage } from "./LoadingModal.styles";
import { useEffect, useState } from "react";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import useTranslate from "module/common/hook/useTranslate";
import { Backdrop, Col, Spinner } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import Logo from "../../display/Logo/Logo";

const LoadingModal = ({
    loading,
    successMessage,
    error = false,
    success = false,
    processingMessage,
    onClose,
    children,
    ...backdropProps
}: LoadingModalProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const translate = useTranslate();

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
        onClose?.();
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
                            <Col gap={40} flex={1} justifyContent="center">
                                <Col alignItems="center" gap={14}>
                                    <SuccessIcon />
                                    <LoadingModalMessage textAlign="center" variant="body2Strong">
                                        {successMessage}
                                    </LoadingModalMessage>
                                </Col>
                                {children}
                            </Col>
                            <Button fullWidth variant="secondary" onPress={handleClose}>
                                {translate("continue")}
                            </Button>
                        </>
                    ) : (
                        <Col alignItems="center" gap={14} flex={1} justifyContent="center">
                            <Logo />
                            <LoadingModalMessage textAlign="center" variant="body2Strong">
                                {processingMessage || translate("processing")}
                            </LoadingModalMessage>
                            <Spinner size="large" color="white" />
                        </Col>
                    )}
                </LoadingModalContent>
            </LoadingModalRoot>
        </Backdrop>
    );
};
export default LoadingModal;
