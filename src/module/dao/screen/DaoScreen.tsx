import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { CardBackgroundHome } from "module/main/screen/HomeScreen/HomeScreen.styles";
import { Col } from "react-native-components";
import DaoCard from "../core/DaoAccountCard/DaoCard";

const DaoScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <CardBackgroundHome />
            <Col flex={1} gap={20} style={{ padding: 20 }}>
                <DaoCard />
            </Col>
        </BaseMainScreen>
    );
};

export default DaoScreen;
