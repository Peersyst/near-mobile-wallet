import { LoadingModalProps } from "./LoadingModal.types";
import { GoBack, LoadingModalBackdrop, SuccessIcon, SuccessMessage } from "./LoadingModal.styles";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { darkTheme } from "module/common/style/darkTheme";
import Isotip from "module/common/component/display/Logos/Isotip/Isotip";
import { useEffect, useState } from "react";

const LoadingModal = ({ loading, successMessage, error, success, ...backdropProps }: LoadingModalProps): JSX.Element => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) setOpen(loading || success || error);
        else if (error) setOpen(false);
    }, [loading, success, error]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <LoadingModalBackdrop
                open={open}
                closable={false}
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
                        <GoBack onBack={() => setOpen(false)} />
                    </>
                ) : (
                    <Isotip size="md" />
                )}
            </LoadingModalBackdrop>
        </ThemeProvider>
    );
};
export default LoadingModal;
