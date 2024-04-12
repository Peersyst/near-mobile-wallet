import { Row } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { Token } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import TokenBalance from "../../display/TokenBalance/TokenBalance";
import useGetSwapLink from "module/common/hook/useGetSwapLink";
import { Linking } from "react-native";
import { TokenDetailsCardButton, TokenDetailsCardRoot } from "./TokenDetailsCard.styles";

import useHaveNearInAccount from "module/wallet/hook/useHaveNearInAccount";

export interface TokenDetailsCardProps {
    token: Token;
    onSend?: () => void;
}

const TokenDetailsCard = ({ token, onSend }: TokenDetailsCardProps): JSX.Element => {
    const translate = useTranslate();

    const uriSwap = useGetSwapLink({ contractId: token.contractId });
    const haveNearInAccount = useHaveNearInAccount();

    function handleOnSwapButtonPress(): void {
        Linking.openURL(uriSwap);
    }

    return (
        <>
            <TokenDetailsCardRoot variant="gray">
                <TokenBalance
                    balanceProps={{ variant: "body1Strong" }}
                    fiatBalanceProps={{ variant: "body4Strong" }}
                    token={token}
                    alignItems="center"
                />
                <Row gap={8}>
                    <TokenDetailsCardButton size="lg" variant="quaternary" onPress={onSend} disabled={!haveNearInAccount}>
                        {capitalize(translate("send"))}
                    </TokenDetailsCardButton>
                    <TokenDetailsCardButton size="lg" variant="quaternary" onPress={handleOnSwapButtonPress} disabled={!haveNearInAccount}>
                        {capitalize(translate("swap"))}
                    </TokenDetailsCardButton>
                </Row>
            </TokenDetailsCardRoot>
        </>
    );
};

export default TokenDetailsCard;
