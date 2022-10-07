import { Col, ScrollView } from "@peersyst/react-native-components";
import Switch from "module/common/component/input/Switch/Switch";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { Text } from "react-native";

const StakingScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <ScrollView>
                <Col style={{ padding: 20, backgroundColor: "#f5f5f5" }} gap={10}>
                    <Switch
                        label={"Switch"}
                        LabelProps={{ style: { label: { color: "red" } } }}
                        style={{ component: { readonly: { thumb: {} } } }}
                    >
                        {[
                            <Text style={{ fontSize: 10 }} key="2">
                                ☀️
                            </Text>,
                            <Text style={{ fontSize: 10 }} key="1">
                                🌙
                            </Text>,
                        ]}
                    </Switch>
                </Col>
            </ScrollView>
        </BaseMainScreen>
    );
};

export default StakingScreen;
