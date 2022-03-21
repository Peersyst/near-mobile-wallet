import { translate } from "locale";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { Animated, Col, Row } from "react-native-components";
import { useSetRecoilState } from "recoil";
import BaseSettingsModalScreen from "../components/layout/BaseSettingsModalScreen/BaseSettingsModalScreen";
import pinConfirmedState from "../state/PinConfirmedState";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, appear: true });

const ConfirmPinScreen = (): JSX.Element => {
    const setPinConfirmedState = useSetRecoilState(pinConfirmedState);
    const [error, setError] = useState(false);
    const handleSubmit = async (pin: string) => {
        const storedPin = await WalletStorage.getPin();
        if (pin === storedPin) {
            setPinConfirmedState({ pinConfirmed: true, hasNewPin: false });
        } else {
            setError(true);
        }
    };
    return (
        <BaseSettingsModalScreen title="Confirm your PIN" back>
            <Row flex={1} alignItems="center">
                <Col flex={1} style={{ maxHeight: 525 }}>
                    <AnimatedNumericPad
                        placeholder={error ? translate("pins_did_not_match") : translate("enter_your_pin")}
                        onSubmit={handleSubmit}
                        in={true}
                    />
                </Col>
            </Row>
        </BaseSettingsModalScreen>
    );
};

export default ConfirmPinScreen;
