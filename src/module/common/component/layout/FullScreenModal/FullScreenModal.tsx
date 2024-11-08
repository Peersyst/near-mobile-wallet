import { View } from "react-native";
import Navbar from "../../navigation/Navbar/Navbar";
import { useBasePagePaddingTop } from "../BasePage/hooks/useBasePagePaddingTop";
import Toolbar from "../Toolbar/Toolbar";
import { FullScreenModalProps } from "./FullScreenModal.types";
import { Backdrop } from "@peersyst/react-native-components";
import { FullScreenModalContent } from "module/common/component/layout/FullScreenModal/FullScreenModal.styles";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";

const FullScreenModal = ({ children, title, back, closable = true, style, ...rest }: FullScreenModalProps): JSX.Element => {
    const navbarProps = { title, back };
    const paddingTop = useBasePagePaddingTop({ header: false });

    return (
        <Backdrop closable={closable} {...rest}>
            {(_open, setOpen) => (
                <DarkThemeProvider>
                    <FullScreenModalContent style={style}>
                        {/**
                         * Due to a problem with the MainBottomNavigatorGroup a paddingTop is needed to be passed to the main
                         * children of the BasePage. This is a workaround to fix the issue with the padding.
                         */}
                        <View style={{ paddingTop, flex: 1 }}>
                            <Toolbar>
                                {Object.entries(navbarProps).length > 0 && (
                                    <Navbar onBack={() => setOpen(false)} style={{ borderBottomWidth: 0 }} {...navbarProps} />
                                )}
                            </Toolbar>
                            {children}
                        </View>
                    </FullScreenModalContent>
                </DarkThemeProvider>
            )}
        </Backdrop>
    );
};
export default FullScreenModal;
