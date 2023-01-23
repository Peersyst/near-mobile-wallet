import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useRecoilValue } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { AlertProps, Col } from "@peersyst/react-native-components";
import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import { ReactNode } from "react";
import Alert from "module/common/component/feedback/Alert/Alert";

interface SuccessScreenProps {
    onClose: (() => void) | undefined;
    message: AlertProps["content"];
    children?: ReactNode;
}

const SuccessScreen = ({ onClose, message, children }: SuccessScreenProps): JSX.Element => {
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

export default SuccessScreen;