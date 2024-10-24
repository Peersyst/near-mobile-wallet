import { LoadingModalProps } from "./LoadingModal.types";
import { DarkLoadingModalOverlay, LoadingModalRoot, SuccessIcon, LoadingModalContent, LoadingModalMessage } from "./LoadingModal.styles";
import { useEffect, useState } from "react";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import useTranslate from "module/common/hook/useTranslate";
import { Backdrop, Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { LoadingLogo } from "../LoadingLogo/LoadingLogo";

const LoadingModal = ({
    loading,
    successMessage,
    error = false,
    success = false,
    processingMessage,
    processingDescriptionMessage,
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
                        <Col alignItems="center" gap={30} flex={1} justifyContent="center">
                            <LoadingLogo color="white" />
                            <Col gap={12} alignItems="center">
                                <LoadingModalMessage variant="body1Strong" color="text">
                                    {processingMessage || translate("processing")}
                                </LoadingModalMessage>
                                <LoadingModalMessage variant="body3Regular" color="overlay.80%">
                                    {processingDescriptionMessage || translate("pleaseWaitAMoment")}
                                </LoadingModalMessage>
                            </Col>
                        </Col>
                    )}
                </LoadingModalContent>
            </LoadingModalRoot>
        </Backdrop>
    );
};
export default LoadingModal;
