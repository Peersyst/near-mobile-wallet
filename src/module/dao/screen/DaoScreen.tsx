import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { CardBackgroundHome } from "module/main/screen/HomeScreen/HomeScreen.styles";
import { Col } from "react-native-components";
import DaoCard, { DaoCardProps } from "../core/DaoAccountCard/DaoCard";

const DaoData:DaoCardProps = {
    availableBalance: "12635.304223",
    lockedBalance: "594.323",
    currentApc: "2.4"
}

const DaoScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <CardBackgroundHome />
            <Col flex={1} gap={20} style={{ padding: 20 }}>
                <DaoCard {...DaoData} />
            </Col>
        </BaseMainScreen>
    );
};

export default DaoScreen;
