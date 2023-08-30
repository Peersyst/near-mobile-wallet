import { Col } from "@peersyst/react-native-components";
import { config } from "config";
import Button from "module/common/component/input/Button/Button";
import { ButtonProps } from "module/common/component/input/Button/Button.types";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { useTranslate } from "module/common/hook/useTranslate";

import { PropsWithChildren } from "react";

type SignModalScaffoldButtonProps = Omit<ButtonProps, "variant" | "children" | "onPress" | "fullWidth">;

export interface SignModalScaffoldProps extends PropsWithChildren {
    onSign: () => void;
    onReject: () => void;
    sign?: SignModalScaffoldButtonProps;
    reject?: SignModalScaffoldButtonProps;
}

const SignModalScaffold = ({ children, onSign, onReject, sign, reject }: SignModalScaffoldProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <Col flex={1} justifyContent="space-between">
            <Col flex={1}>{children}</Col>
            <Col gap={12} style={{ marginTop: 24 }}>
                <Button {...reject} variant="text" onPress={onReject} fullWidth>
                    {translate("reject")}
                </Button>
                <CountdownButton {...sign} variant="primary" onPress={onSign} fullWidth countdownTime={config.approveTxWaitTime}>
                    {translate("sign")}
                </CountdownButton>
            </Col>
        </Col>
    );
};

export default SignModalScaffold;
