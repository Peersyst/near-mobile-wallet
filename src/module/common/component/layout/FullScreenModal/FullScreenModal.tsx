import { useTheme } from "@peersyst/react-native-styled";
import { Backdrop } from "../../base/feedback/Backdrop";
import Navbar from "../../navigation/Navbar/Navbar";
import Toolbar from "../Toolbar/Toolbar";
import { FullScreenModalProps } from "./FullScreenModal.types";
import BasePage from "../BasePage/BasePage";

const FullScreenModal = ({
    children,
    appearance: appearanceProp,
    logo,
    title,
    back,
    onOpen,
    onExited,
    closable = true,
    ...rest
}: FullScreenModalProps): JSX.Element => {
    const navbarProps = { logo, title, back };
    const {
        palette: { mode },
    } = useTheme();
    const appearance = appearanceProp || mode;

    return (
        <Backdrop closable={closable} {...rest}>
            {(_open, setOpen) => (
                <BasePage appearance={appearance} header={false}>
                    <Toolbar>{Object.entries(navbarProps).length > 0 && <Navbar onBack={() => setOpen(false)} {...navbarProps} />}</Toolbar>
                    {children}
                </BasePage>
            )}
        </Backdrop>
    );
};
export default FullScreenModal;
