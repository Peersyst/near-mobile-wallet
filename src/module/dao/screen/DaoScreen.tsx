import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";
import { Col } from "react-native-components";
import DaoCard from "../component/core/DaoAccountCard/DaoCard";
import DaoTabs from "../navigation/DaoTabs/DaoTabs";

const DaoScreen = (): JSX.Element => {
    return (
        <BaseWithBackgroundMainScreen>
            <Col style={{ padding: 20, paddingBottom: 40 }}>
                <DaoCard />
            </Col>
            <DaoTabs />
        </BaseWithBackgroundMainScreen>
    );
};

export default DaoScreen;
