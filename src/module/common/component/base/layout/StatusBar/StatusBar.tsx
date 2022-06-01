import { StatusBarProps } from "./StatusBar.types";
import { useTheme } from "@peersyst/react-native-styled";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StatusBar as NativeStatusBar } from "react-native";

const StatusBar = ({ appearance: appearanceProp, ...rest }: StatusBarProps): JSX.Element => {
    const {
        palette: { mode },
    } = useTheme();

    const appearance = appearanceProp || mode;
    NativeStatusBar.setBarStyle(appearance === "dark" ? "light-content" : "dark-content");

    return <ExpoStatusBar style={appearance === "dark" ? "light" : "dark"} translucent {...rest} />;
};

export default StatusBar;
