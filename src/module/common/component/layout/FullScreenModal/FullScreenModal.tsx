import Navbar from "../../navigation/Navbar/Navbar";
import Toolbar from "../Toolbar/Toolbar";
import { FullScreenModalProps } from "./FullScreenModal.types";
import BasePage from "../BasePage/BasePage";
import { Backdrop } from "@peersyst/react-native-components";

const FullScreenModal = ({ children, title, back, closable = true, ...rest }: FullScreenModalProps): JSX.Element => {
    const navbarProps = { title, back };

    return (
        <Backdrop closable={closable} {...rest}>
            {(_open, setOpen) => (
                <BasePage header={false}>
                    <Toolbar>{Object.entries(navbarProps).length > 0 && <Navbar onBack={() => setOpen(false)} {...navbarProps} />}</Toolbar>
                    {children}
                </BasePage>
            )}
        </Backdrop>
    );
};
export default FullScreenModal;
