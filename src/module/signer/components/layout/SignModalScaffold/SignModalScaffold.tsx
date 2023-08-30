import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { SignModalScaffoldProps } from "./SignModalScaffold.types";
import SwipeButton from "module/common/component/feedback/SwipeButton/SwipeButton";

const SignModalScaffold = ({ children, onSign, onReject, sign, reject }: SignModalScaffoldProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <Col flex={1} justifyContent="space-between">
            <Col flex={1}>{children}</Col>
            <Col gap={12} style={{ marginTop: 20 }}>
                <Button {...reject} variant="text" onPress={onReject} fullWidth>
                    {translate("reject")}
                </Button>
                <SwipeButton {...sign} onSwipe={onSign} fullWidth>
                    {translate("slideToAccept")}
                </SwipeButton>
            </Col>
        </Col>
    );
};

export default SignModalScaffold;
