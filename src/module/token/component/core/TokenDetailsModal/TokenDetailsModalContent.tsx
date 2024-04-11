import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { Token } from "near-peersyst-sdk";
import TokenDetailsCard from "../../display/TokenDetailsCard/TokenDetailsCard";
import useHaveNearInAccount from "module/wallet/hook/useHaveNearInAccount";
import YouDontHaveNearCard from "module/wallet/component/display/YouDontHaveNearCard/YouDontHaveNearCard";
import useTranslate from "module/common/hook/useTranslate";
import { TokensResourceType } from "locale";
import tokens from "../../../../../../src/locale/locales/en/tokens.json";
import { useMemo } from "react";

export interface TokenDetailsModalContentProps {
    token: Token;
    onClose?: () => void;
}

export default function TokenDetailsModalContent({ token, onClose }: TokenDetailsModalContentProps): JSX.Element {
    const haveNearInAccount = useHaveNearInAccount();
    const translate = useTranslate("tokens");
    const haveTokenDescription = useMemo(() => Object.keys(tokens).includes(token.metadata?.symbol), [token.metadata?.symbol, tokens]);

    return (
        <Col gap="7%">
            {haveTokenDescription && (
                <Typography textAlign="left" variant="body3Regular" color="overlay.60%">
                    {translate(token.metadata?.symbol as TokensResourceType)}
                </Typography>
            )}
            <TokenDetailsCard token={token} onClose={onClose} />
            {!haveNearInAccount && <YouDontHaveNearCard />}
        </Col>
    );
}
