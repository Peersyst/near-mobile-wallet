import { Backdrop } from "../../base/feedback/Backdrop";
import { createBackdrop } from "../../base/feedback/ModalProvider";
import Navbar from "../../navigation/Navbar/Navbar";
import Toolbar from "../Toolbar/Toolbar";
import { FullScreenModalRoot } from "./FullScreenModal.styles";
import { FullScreenModalProps } from "./FullScreenModal.types";

const FullScreenModal = createBackdrop(({ children, appearance, onExited, logo, title, back, onBack, ...rest }: FullScreenModalProps) => {
    const navbarProps = { logo, title, back };
    const handleBack = (setOpen: (value: boolean) => unknown) => {
        if (onBack) onBack();
        setOpen(false);
    };
    return (
        <Backdrop>
            {(_open, setOpen) => (
                <FullScreenModalRoot appearance={appearance}>
                    <Toolbar>
                        {Object.entries(navbarProps).length > 0 && <Navbar onBack={() => handleBack(setOpen)} {...navbarProps} />}
                    </Toolbar>
                    {children}
                </FullScreenModalRoot>
            )}
        </Backdrop>
    );
});

export default FullScreenModal;
