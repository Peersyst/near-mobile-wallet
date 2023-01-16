import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import { Col } from "@peersyst/react-native-components";
import { ReactElement } from "react";
import { MainContentCard } from "./MainGradientScreen.styles";

interface MainGradientScreenProps {
    children: { slider: ReactElement; content: ReactElement };
}

const MainGradientScreen = ({ children: { slider, content } }: MainGradientScreenProps): JSX.Element => {
    return (
        <BaseMainGradientScreen>
            <Col flex={1}>
                {slider}
                <MainContentCard>{content}</MainContentCard>
            </Col>
        </BaseMainGradientScreen>
    );
};

export default MainGradientScreen;
