import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";
import { Col } from "react-native-components";
import DaoCard from "../core/DaoAccountCard/DaoCard";

const DaoScreen = (): JSX.Element => {
    return (
        <BaseWithBackgroundMainScreen>
            <Col flex={1} gap={20} style={{ padding: 20 }}>
                <DaoCard />
            </Col>
        </BaseWithBackgroundMainScreen>
    );
};

export default DaoScreen;
