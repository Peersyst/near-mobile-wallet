import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import { Col } from "@peersyst/react-native-components";
import { ReactElement } from "react";

interface MainGradientScreenProps {
    children: { slider: ReactElement; content?: ReactElement };
}

const MainGradientScreen = ({ children: { slider, content } }: MainGradientScreenProps): JSX.Element => {
    return (
        <BaseMainGradientScreen>
            <Col flex={1}>
                {slider}
                {content}
            </Col>
        </BaseMainGradientScreen>
    );
};

export default MainGradientScreen;
