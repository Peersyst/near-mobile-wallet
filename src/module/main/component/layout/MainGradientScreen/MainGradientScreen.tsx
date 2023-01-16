import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import { Col } from "@peersyst/react-native-components";
import { ReactElement } from "react";
import { ScrollView } from "react-native";

interface MainGradientScreenProps {
    children: { slider: ReactElement; content?: ReactElement };
    scrollable?: boolean;
}

const MainGradientScreen = ({ children: { slider, content }, scrollable = false }: MainGradientScreenProps): JSX.Element => {
    return (
        <BaseMainGradientScreen>
            {scrollable ? (
                <Col flex={1}>
                    <ScrollView>
                        {slider}
                        {content}
                    </ScrollView>
                </Col>
            ) : (
                <Col flex={1}>
                    {slider}
                    {content}
                </Col>
            )}
        </BaseMainGradientScreen>
    );
};

export default MainGradientScreen;
