import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import { Col } from "@peersyst/react-native-components";
import DAOCard from "../component/core/DAOAccountCard/DAOCard";
import DAOTabs from "../navigation/DAOTabs/DAOTabs";

const DAOScreen = (): JSX.Element => {
    return (
        <BaseMainGradientScreen>
            <Col style={{ padding: 20, paddingBottom: 40 }}>
                <DAOCard />
            </Col>
            <DAOTabs />
        </BaseMainGradientScreen>
    );
};

export default DAOScreen;
