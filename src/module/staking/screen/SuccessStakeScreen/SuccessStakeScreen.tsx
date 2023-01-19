import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useRecoilValue } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { Alert, AlertProps, Col } from "@peersyst/react-native-components";
import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import { ReactNode } from "react";

interface SuccessStakeScreenProps {
    onClose: (() => void) | undefined;
    message: AlertProps["content"];
    children?: ReactNode;
}

const SuccessStakeScreen = ({ onClose, message, children }: SuccessStakeScreenProps): JSX.Element => {
    const translate = useTranslate();
    const { validator } = useRecoilValue(stakeState);

    return (
        <Col flex={1} justifyContent="space-between">
            <Col gap={24}>
                <Alert type="success" content={message} />
                <ValidatorInformation validator={validator!} />
                {children}
            </Col>
            <Button variant="primary" fullWidth onPress={onClose}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default SuccessStakeScreen;
