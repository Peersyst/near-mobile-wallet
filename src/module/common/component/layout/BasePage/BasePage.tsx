import { BasePageProps } from "module/common/component/layout/BasePage/BasePage.types";
import Header from "module/common/component/navigation/Header/Header";
import { BasePageRoot } from "./BasePage.styles";
import { StatusBar } from "@peersyst/react-native-components";
import { View } from "react-native";

const BasePage = ({ children, header = true, style }: BasePageProps): JSX.Element => {
    return (
        <>
            <BasePageRoot style={style}>
                {header && <Header />}
                <View style={{ flex: 1 }}>{children}</View>
            </BasePageRoot>
            <StatusBar />
        </>
    );
};

export default BasePage;
