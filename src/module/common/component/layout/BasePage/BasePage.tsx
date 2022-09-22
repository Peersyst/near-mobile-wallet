import { BasePageProps } from "module/common/component/layout/BasePage/BasePage.types";
import { ThemeProvider, useTheme } from "@peersyst/react-native-styled";
import Header from "module/common/component/navigation/Header/Header";
import { BasePageContent, BasePageRoot } from "./BasePage.styles";
import { StatusBar } from "@peersyst/react-native-components";
import darkTheme from "config/theme/darkTheme";
import lightTheme from "config/theme/lightTheme";

const BasePage = ({ children, appearance: appearanceProp, header = true }: BasePageProps): JSX.Element => {
    const {
        palette: { mode },
    } = useTheme();

    const appearance = appearanceProp || mode;

    return (
        <ThemeProvider theme={appearance === "light" ? lightTheme : darkTheme}>
            <BasePageRoot>
                {header && <Header />}
                <BasePageContent header={header}>{children}</BasePageContent>
            </BasePageRoot>
            <StatusBar />
        </ThemeProvider>
    );
};

export default BasePage;
