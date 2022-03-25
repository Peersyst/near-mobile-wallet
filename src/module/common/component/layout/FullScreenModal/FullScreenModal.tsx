import { useTheme } from "@peersyst/react-native-styled";
import { Backdrop } from "../../base/feedback/Backdrop";
import { createBackdrop } from "../../base/feedback/ModalProvider";
import Navbar from "../../navigation/Navbar/Navbar";
import Toolbar from "../Toolbar/Toolbar";
import { FullScreenModalProps } from "./FullScreenModal.types";
import BasePage from "../BasePage/BasePage";
import statusBarState from "../../base/layout/StatusBar/state/StatusBarState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as ExpoStatusBar from "expo-status-bar";
import { StatusBar } from "react-native";
import { useEffect } from "react";

const FullScreenModal = createBackdrop(
    ({ children, appearance: appearanceProp, logo, title, back, onOpen, onExited, closable = true, ...rest }: FullScreenModalProps) => {
        const navbarProps = { logo, title, back };
        const setStatusBarState = useSetRecoilState(statusBarState);
        const {
            palette: { mode },
        } = useTheme();
        const appearance = appearanceProp || mode;
        const handleOpen = () => {
            console.log("hello!");
            StatusBar.setHidden(true)
            //StatusBar.setBarStyle("light-content")
            setStatusBarState({ style: "light-content" });
            onOpen && onOpen();
        };
        const handleExited = () => {
            StatusBar.setBarStyle("dark-content")
            StatusBar.setBackgroundColor("blue")
            setStatusBarState({ style: "dark-content" });
            onExited && onExited();
        };
        // useEffect(() => {
        //     setStatusBarState({ style: "light" });
        //     return () => setStatusBarState({ style: "dark" });
        // }, []);
        // const { style } = useRecoilValue(statusBarState);
        // console.log(style);
        return (
            <>
                <Backdrop
                onEntered={handleOpen} onExited={handleExited} closable={closable} {...rest}>
                    {(_open, setOpen) => (
                        <BasePage appearance={appearance} header={false}>
                            <Toolbar>
                                {Object.entries(navbarProps).length > 0 && <Navbar onBack={() => setOpen(false)} {...navbarProps} />}
                            </Toolbar>
                            {children}
                        </BasePage>
                    )}
                </Backdrop>
            </>
        );
    },
);

export default FullScreenModal;
