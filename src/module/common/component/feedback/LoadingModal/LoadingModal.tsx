import { LoadingModalProps } from "./LoadingModal.types";
import { DarkLoadingModalOverlay, LoadingModalRoot, SuccessIcon, LoadingModalContent, LoadingModalMessage } from "./LoadingModal.styles";
import { useEffect, useState } from "react";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useTranslate } from "module/common/hook/useTranslate";
import { Backdrop, Col, Spinner } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import Logo from "../../display/Logo/Logo";

const LoadingModal = ({ loading, successMessage, error, success, processingMessage, ...backdropProps }: LoadingModalProps): JSX.Element => {
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
                                {processingMessage || translate("processing")}
                            </LoadingModalMessage>
                            <Spinner size="large" />
                        </Col>
                    )}
                </LoadingModalContent>
            </LoadingModalRoot>
        </Backdrop>
    );
};
export default LoadingModal;
