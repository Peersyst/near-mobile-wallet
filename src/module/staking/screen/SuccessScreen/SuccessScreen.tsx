import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { Col, useConfig } from "@peersyst/react-native-components";
import Alert from "module/common/component/feedback/Alert/Alert";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";

interface SuccessScreenProps {
    onClose: (() => void) | undefined;
    process: "stake" | "unstake";
}

const SuccessScreen = ({ onClose, process }: SuccessScreenProps): JSX.Element => {
    const translate = useTranslate();
    const tokenName = useConfig("tokenName");

    const [validator] = useRecoilState(stakeState);

    return (
        <Col flex={1} justifyContent="space-between">
            <Col>
                <Alert
                    type="success"
                    message={process ? translate("stakingSuccess") : translate("unstakingProcess", { token: "X " + tokenName })}
                />
                <ValidatorInformation validator={validator} />
            </Col>
            <Button variant="primary" fullWidth onPress={() => onClose}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default SuccessScreen;
