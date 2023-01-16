import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { Col } from "@peersyst/react-native-components";
import Alert from "module/common/component/feedback/Alert/Alert";

interface SuccessScreenProps {
    onClose: (() => void) | undefined;
}

const SuccessScreen = ({ onClose }: SuccessScreenProps): JSX.Element => {
    const translate = useTranslate();

    const [{ accountId }] = useRecoilState(stakeState);

    return (
        <Col flex={1} justifyContent="space-between">
            <Col>
                <Alert type="success" message={translate("stakingSuccess")} />
                {/* Validator component*/}
            </Col>
            <Button variant="primary" fullWidth onPress={() => onClose}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default SuccessScreen;
