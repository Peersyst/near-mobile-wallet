import { useTheme } from "@peersyst/react-native-styled";
import { Backdrop } from "../../base/feedback/Backdrop";
import { createBackdrop } from "../../base/feedback/ModalProvider";
import Navbar from "../../navigation/Navbar/Navbar";
import Toolbar from "../Toolbar/Toolbar";
import { FullScreenModalProps } from "./FullScreenModal.types";
import BasePage from "../BasePage/BasePage";

const FullScreenModal = createBackdrop(
    ({ children, appearance: appearanceProp, onExited, logo, title, back, onBack, closable = true, ...rest }: FullScreenModalProps) => {
        const navbarProps = { logo, title, back };

        const {
            palette: { mode },
        } = useTheme();
        const appearance = appearanceProp || mode;

        const handleBack = (setOpen: (value: boolean) => unknown) => {
            if (onBack) onBack();
            setOpen(false);
        };

        return (
            <Backdrop closable={closable} {...rest}>
                {(_open, setOpen) => (
                    <BasePage appearance={appearance} header={false}>
                        <Toolbar>
                            {Object.entries(navbarProps).length > 0 && <Navbar onBack={() => handleBack(setOpen)} {...navbarProps} />}
                        </Toolbar>
                        {children}
                    </BasePage>
                )}
            </Backdrop>
        );
    },
);

export default FullScreenModal;
