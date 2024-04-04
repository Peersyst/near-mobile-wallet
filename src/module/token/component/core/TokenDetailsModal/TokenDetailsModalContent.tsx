import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { Token } from "near-peersyst-sdk";
import TokenDetailsCard from "../../display/TokenDetailsCard/TokenDetailsCard";
import useHaveNearInAccount from "module/wallet/hook/useHaveNearInAccount";
import YouDontHaveNearCard from "module/wallet/component/display/YouDontHaveNearCard/YouDontHaveNearCard";

export interface TokenDetailsModalContentProps {
    token: Token;
}

export default function TokenDetailsModalContent({ token }: TokenDetailsModalContentProps): JSX.Element {
    const haveNearInAccount = useHaveNearInAccount();

    return (
        <Col gap={16}>
            {token.metadata?.reference && (
                <Typography textAlign="center" variant="body3Regular" color="overlay.60%">
                    {token.metadata.reference}
                </Typography>
            )}
            <TokenDetailsCard token={token} />
            {!haveNearInAccount && <YouDontHaveNearCard />}
        </Col>
    );
}
