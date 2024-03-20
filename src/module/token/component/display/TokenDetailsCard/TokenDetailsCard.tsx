import { Row } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { Token } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import TokenBalance from "../../display/TokenBalance/TokenBalance";
import useGetSwapLink from "module/common/hook/useGetSwapLink";
import { Linking } from "react-native";
import { TokenDetailsCardButton, TokenDetailsCardRoot } from "./TokenDetailsCard.styles";

export interface TokenDetailsCardProps {
    token: Token;
}

const TokenDetailsCard = ({ token }: TokenDetailsCardProps): JSX.Element => {
    const translate = useTranslate();
    const uriSwap = useGetSwapLink({ contractId: token.contractId });
    return (
        <TokenDetailsCardRoot gap={16} textAlign="center">
            <TokenBalance variant="body3Strong" token={token} alignItems="center" />
            <Row gap={4} justifyContent="center">
                <TokenDetailsCardButton variant="secondary" size="md" fullWidth>
                    {capitalize(translate("send"))}
                </TokenDetailsCardButton>
                <TokenDetailsCardButton variant="secondary" size="md" fullWidth onPress={() => Linking.openURL(uriSwap)}>
                    {capitalize(translate("swap"))}
                </TokenDetailsCardButton>
            </Row>
        </TokenDetailsCardRoot>
    );
};

export default TokenDetailsCard;
