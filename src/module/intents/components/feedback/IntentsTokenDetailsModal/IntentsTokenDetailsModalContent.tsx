import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { IntentsTokenBalance } from "near-peersyst-sdk";
import useHaveNearInAccount from "module/wallet/hook/useHaveNearInAccount";
import YouDontHaveNearCard from "module/wallet/component/display/YouDontHaveNearCard/YouDontHaveNearCard";
import IntentsTokenDetailsCard from "../../display/IntentsTokenDetailsCard/IntentsTokenDetailsCard";
import useTranslate from "module/common/hook/useTranslate";

export interface IntentsTokenDetailsModalContentProps {
    token: IntentsTokenBalance;
    onWithdraw?: () => void;
    onSwap?: () => void;
}

export default function IntentsTokenDetailsModalContent({ token, onWithdraw, onSwap }: IntentsTokenDetailsModalContentProps): JSX.Element {
    const haveNearInAccount = useHaveNearInAccount();
    const translate = useTranslate("tokens");
    const tokenDescription = translate(token.symbol as any);
    const hasDescription = tokenDescription !== token.symbol;

    return (
        <Col gap="7%">
            {hasDescription && (
                <Typography textAlign="left" variant="body3Regular" color="overlay.60%">
                    {tokenDescription}
                </Typography>
            )}
            <IntentsTokenDetailsCard token={token} onWithdraw={onWithdraw} onSwap={onSwap} />
            {!haveNearInAccount && <YouDontHaveNearCard />}
        </Col>
    );
}
