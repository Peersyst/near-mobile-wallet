import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { Col, Row } from "react-native-components";
import BaseSettingsModalScreen from "../components/layout/BaseSettingsModalScreen/BaseSettingsModalScreen";

const ConfirmPinScreen = (): JSX.Element => {
    return (
        <BaseSettingsModalScreen title="Create your new PIN" back>
            <Row style={{ flex: 1, alignItems: "center" }}>
                <Col style={{ flex: 1, maxHeight: 600 }}>
                    <SetWalletPinScreen updating onSuccess={() => ""} />
                </Col>
            </Row>
        </BaseSettingsModalScreen>
    );
};

export default ConfirmPinScreen;
