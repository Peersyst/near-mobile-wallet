import { BasePageProps } from "module/common/component/layout/BasePage/BasePage.types";
import Header from "module/common/component/navigation/Header/Header";
import { BasePageRoot } from "./BasePage.styles";
import { StatusBar } from "@peersyst/react-native-components";
import { View } from "react-native";
import { useBasePagePaddingTop } from "./hooks/useBasePagePaddingTop";

const BasePage = ({ children, header = true, style, watchStatusBar = true, handlePadding = true }: BasePageProps): JSX.Element => {
    const paddingTop = useBasePagePaddingTop({ watchStatusBar, header });

    return (
        <>
            <BasePageRoot style={style}>
                {header && <Header />}
                <View style={{ flex: 1, ...(handlePadding && { paddingTop }) }}>{children}</View>
            </BasePageRoot>
            <StatusBar />
        </>
    );
};

export default BasePage;
