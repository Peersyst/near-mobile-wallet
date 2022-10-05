import { Col, Row, ScrollView, Typography } from "@peersyst/react-native-components";
import Switch from "module/common/component/input/Switch/Switch";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { Text } from "react-native";

const StakingScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <ScrollView>
                <Col style={{ padding: 20, backgroundColor: "#f5f5f5" }} gap={10}>
                    <Switch
                        RightComponent={<Text style={{ lineHeight: 15, fontSize: 10 }}>🌙</Text>}
                        LeftComponent={<Text style={{ lineHeight: 15, fontSize: 10 }}>☀️</Text>}
                    />
                </Col>
            </ScrollView>
        </BaseMainScreen>
    );
};

export default StakingScreen;
