import { BasePageProps } from "module/common/component/layout/BasePage/BasePage.types";
import Header from "module/common/component/navigation/Header/Header";
import { BasePageContent, BasePageRoot } from "./BasePage.styles";
import { StatusBar } from "@peersyst/react-native-components";

const BasePage = ({ children, header = true, style, watchStatusBar = true }: BasePageProps): JSX.Element => {
    return (
        <>
            <BasePageRoot style={style}>
                {header && <Header />}
                <BasePageContent watchStatusBar={watchStatusBar} header={header}>
                    {children}
                </BasePageContent>
            </BasePageRoot>
            <StatusBar />
        </>
    );
};

export default BasePage;
