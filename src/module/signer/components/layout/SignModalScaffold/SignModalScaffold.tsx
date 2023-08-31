import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { SignModalScaffoldProps } from "./SignModalScaffold.types";

const SignModalScaffold = ({ children, onSign, onReject, sign, reject }: SignModalScaffoldProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <Col flex={1} justifyContent="space-between">
            <Col flex={1}>{children}</Col>
            <Col gap={12} style={{ marginTop: 20 }}>
                <Button {...reject} variant="text" onPress={onReject} fullWidth>
                    {translate("reject")}
                </Button>
                <Button {...sign} onPress={onSign} fullWidth>
                    {translate("slideToAccept")}
                </Button>
            </Col>
        </Col>
    );
};

export default SignModalScaffold;
