import { LoadingModalProps } from "./LoadingModal.types";
import { LoadingModalBackdrop, SuccessIcon, SuccessMessage } from "./LoadingModal.styles";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { darkTheme } from "module/common/style/darkTheme";
import Isotip from "module/common/component/display/Logos/Isotip/Isotip";
import { useEffect, useState } from "react";
import { translate } from "locale";

const LoadingModal = ({ loading, successMessage, error, success, ...backdropProps }: LoadingModalProps): JSX.Element => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) setOpen(loading || success || error);
        else if (error) setOpen(false);
        if (success) setTimeout(() => setOpen(false), 3000);
    }, [loading, success, error]);

    useEffect(() => {
        let closeTimeout: NodeJS.Timeout;
        if (success) {
            closeTimeout = setTimeout(() => setOpen(false), 3000);
        }
        return () => {
            if (closeTimeout) clearTimeout(closeTimeout);
        };
    }, [success]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <LoadingModalBackdrop
                open={open}
                closable={success}
                swipeable={false}
                onClose={handleClose}
                animationIn="fadeIn"
                animationOut="fadeOut"
                {...backdropProps}
            >
                {success ? (
                    <>
                        <SuccessIcon />
                        <SuccessMessage textAlign="center" variant="body1">
                            {successMessage}
                        </SuccessMessage>
                    </>
                ) : (
                    <>
                        <Isotip size="md" />
                        <SuccessMessage textAlign="center" variant="body1">
                            {translate("processing")}
                        </SuccessMessage>
                    </>
                )}
            </LoadingModalBackdrop>
        </ThemeProvider>
    );
};
export default LoadingModal;
