import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { SignatureScaffoldProps } from "./SignatureScaffold.types";
import SwipeButton from "module/common/component/feedback/SwipeButton/SwipeButton";

const SignatureScaffold = ({ children, onSign, onReject, sign, reject }: SignatureScaffoldProps): JSX.Element => {
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

export default SignatureScaffold;
