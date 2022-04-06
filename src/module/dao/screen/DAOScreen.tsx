import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";
import { Col } from "react-native-components";
import DAOCard from "../component/core/DAOAccountCard/DAOCard";
import DAOTabs from "../navigation/DAOTabs/DAOTabs";

const DAOScreen = (): JSX.Element => {
    return (
        <BaseWithBackgroundMainScreen>
            <Col style={{ padding: 20, paddingBottom: 40 }}>
                <DAOCard />
            </Col>
            <DAOTabs />
        </BaseWithBackgroundMainScreen>
    );
};

export default DAOScreen;
