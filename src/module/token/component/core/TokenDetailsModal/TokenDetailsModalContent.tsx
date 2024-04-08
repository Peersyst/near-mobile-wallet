import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { Token } from "near-peersyst-sdk";
import TokenDetailsCard from "../../display/TokenDetailsCard/TokenDetailsCard";
import useHaveNearInAccount from "module/wallet/hook/useHaveNearInAccount";
import YouDontHaveNearCard from "module/wallet/component/display/YouDontHaveNearCard/YouDontHaveNearCard";
import useTranslate from "module/common/hook/useTranslate";
import { TokensResourceType } from "locale";
import tokens from "../../../../../../src/locale/locales/en/tokens.json";

export interface TokenDetailsModalContentProps {
    token: Token;
}

export default function TokenDetailsModalContent({ token }: TokenDetailsModalContentProps): JSX.Element {
    const haveNearInAccount = useHaveNearInAccount();
    const translate = useTranslate("tokens");
    return (
        <Col gap={16}>
            {Object.keys(tokens).includes(token.metadata?.symbol) && (
                <Typography textAlign="center" variant="body3Regular" color="overlay.60%">
                    {translate(token.metadata?.symbol as TokensResourceType)}
                </Typography>
            )}
            <TokenDetailsCard token={token} />
            {!haveNearInAccount && <YouDontHaveNearCard />}
        </Col>
    );
}
