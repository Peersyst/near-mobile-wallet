import Navbar from "../../navigation/Navbar/Navbar";
import Toolbar from "../Toolbar/Toolbar";
import { FullScreenModalProps } from "./FullScreenModal.types";
import { Backdrop } from "@peersyst/react-native-components";
import { FullScreenModalContent } from "module/common/component/layout/FullScreenModal/FullScreenModal.styles";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";

const FullScreenModal = ({ children, title, back, closable = true, style, ...rest }: FullScreenModalProps): JSX.Element => {
    const navbarProps = { title, back };

    return (
        <Backdrop closable={closable} {...rest}>
            {(_open, setOpen) => (
                <DarkThemeProvider>
                    <FullScreenModalContent style={style}>
                        <Toolbar>
                            {Object.entries(navbarProps).length > 0 && <Navbar onBack={() => setOpen(false)} {...navbarProps} />}
                        </Toolbar>
                        {children}
                    </FullScreenModalContent>
                </DarkThemeProvider>
            )}
        </Backdrop>
    );
};
export default FullScreenModal;
