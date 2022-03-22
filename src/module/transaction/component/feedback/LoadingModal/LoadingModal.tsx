import { LoadingModalProps } from "./LoadingModal.types";
import { GoBack, LoadingModalBackdrop, SuccessIcon, SuccessMessage } from "./LoadingModal.styles";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { darkTheme } from "module/common/style/darkTheme";
import Isotip from "module/common/component/display/Logos/Isotip/Isotip";
import { Modal } from "react-native";
import { useEffect, useState } from "react";

const LoadingModal = ({ loading, successMessage, error, success, onExited, ...backdropProps }: LoadingModalProps): JSX.Element => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!visible) setVisible(loading || success || error);
    }, [loading, success, error]);

    const handleExit = () => {
        onExited?.();
        setVisible(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Modal visible={visible} transparent>
                <LoadingModalBackdrop closable={false} onExited={handleExit} {...backdropProps}>
                    {([open, setOpen]) => {
                        if (error && open) setOpen(false);
                        return success ? (
                            <>
                                <SuccessIcon />
                                <SuccessMessage variant="body1">{successMessage}</SuccessMessage>
                                <GoBack onBack={() => setOpen(false)} />
                            </>
                        ) : (
                            <Isotip size="md" />
                        );
                    }}
                </LoadingModalBackdrop>
            </Modal>
        </ThemeProvider>
    );
};
export default LoadingModal;
