import { BasePageProps } from "module/common/component/layout/BasePage/BasePage.types";
import { ThemeProvider, useTheme } from "@peersyst/react-native-styled";
import { theme } from "module/common/style/theme";
import { darkTheme } from "module/common/style/darkTheme";
import Header from "module/common/component/navigation/Header/Header";
import { BasePageRoot } from "./BasePage.styles";
import { Platform, StatusBar } from "react-native";

const BasePage = ({ children, appearance: appearanceProp, header = true, showIcons }: BasePageProps): JSX.Element => {
    const {
        palette: { mode },
    } = useTheme();

    const appearance = appearanceProp || mode;

    return (
        <ThemeProvider theme={appearance === "light" ? theme : darkTheme}>
            <BasePageRoot>
                {Platform.OS === "android" || ("ios" && <StatusBar barStyle={appearance === "dark" ? "light-content" : "dark-content"} />)}
                {header && <Header showIcons={showIcons} />}
                {children}
            </BasePageRoot>
        </ThemeProvider>
    );
};

export default BasePage;
