import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { SignatureScaffoldProps } from "./SignatureScaffold.types";
import Typography from "module/common/component/display/Typography/Typography";
import useIsAccountActive from "module/signer/queries/useIsActiveAccount";
import SwipeButton from "module/common/component/feedback/SwipeButton/SwipeButton";

const SignatureScaffold = ({ children, onSign, onReject, sign = {}, reject = {} }: SignatureScaffoldProps): JSX.Element => {
    const { disabled: isSigningDisabled, ...restSign } = sign;
    const { disabled: isRejectingDisabled, ...restReject } = reject;

    const translate = useTranslate();

    const { data: isActiveAccount, isLoading: isActiveAccountLoading } = useIsAccountActive();

    return (
        <Col flex={1} justifyContent="space-between">
            <Col flex={1}>{children}</Col>
            <Col gap={12} style={{ marginTop: 20 }}>
                <Button
                    {...restReject}
                    variant="text"
                    onPress={onReject}
                    fullWidth
                    disabled={isRejectingDisabled || isActiveAccountLoading || !isActiveAccount}
                >
                    {translate("reject")}
                </Button>
                <SwipeButton
                    {...restSign}
                    onSwipe={onSign}
                    fullWidth
                    disabled={isSigningDisabled || isActiveAccountLoading || !isActiveAccount}
                >
                    {translate("slideToAccept")}
                </SwipeButton>
                {!isActiveAccount && (
                    <Typography variant="body4Regular" textAlign="center">
                        {translate("signerChangeAccount")}
                    </Typography>
                )}
            </Col>
        </Col>
    );
};

export default SignatureScaffold;
