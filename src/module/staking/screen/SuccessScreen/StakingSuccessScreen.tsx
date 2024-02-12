import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useRecoilValue } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { AlertProps, Col } from "@peersyst/react-native-components";
import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import { ReactNode } from "react";
import Alert from "module/common/component/feedback/Alert/Alert";

interface StakingSuccessScreenScreenProps {
    onClose: (() => void) | undefined;
    message: AlertProps["content"];
    children?: ReactNode;
    showValidator?: boolean;
}

const StakingSuccessScreen = ({ onClose, message, showValidator = true, children }: StakingSuccessScreenScreenProps): JSX.Element => {
    const translate = useTranslate();
    const { validator } = useRecoilValue(stakeState);

    return (
        <Col flex={1} justifyContent="space-between">
            <Col gap={24}>
                <Alert type="success" content={message} />
                {showValidator && <ValidatorInformation validator={validator!} stakingBalanceType={"available"} />}
                {children}
            </Col>
            <Button variant="primary" fullWidth onPress={onClose}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default StakingSuccessScreen;
