import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import { Col } from "@peersyst/react-native-components";
import { ReactElement } from "react";

interface MainGradientScreenProps {
    children: { slider: ReactElement; body?: ReactElement };
}

const MainGradientScreen = ({ children: { slider, body } }: MainGradientScreenProps): JSX.Element => {
    return (
        <BaseMainGradientScreen>
            <Col flex={1}>
                {slider}
                {body}
            </Col>
        </BaseMainGradientScreen>
    );
};

export default MainGradientScreen;
