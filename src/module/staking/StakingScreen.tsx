import { Col, ScrollView } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import Switch from "module/common/component/input/Switch/Switch";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { useState } from "react";
import { Text } from "react-native";

const StakingScreen = (): JSX.Element => {
    const [disabled, setDisabled] = useState(false);
    return (
        <BaseMainScreen>
            <ScrollView>
                <Col style={{ padding: 20, backgroundColor: "#f5f5f5" }} gap={10}>
                    <Switch
                        label={"Switch"}
                        disabled={disabled}
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
                    <Button variant="outlined" onPress={() => setDisabled((value) => !value)}>
                        Toggle disabled
                    </Button>
                </Col>
            </ScrollView>
        </BaseMainScreen>
    );
};

export default StakingScreen;
