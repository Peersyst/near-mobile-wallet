import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";

const DAppsScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <Col flex={1} alignItems="center" justifyContent="center">
                <Typography variant="body2Regular">DApps screen</Typography>
            </Col>
        </BaseMainScreen>
    );
};

export default DAppsScreen;
