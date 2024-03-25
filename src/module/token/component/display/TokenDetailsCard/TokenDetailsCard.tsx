import { Row, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { Token } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import TokenBalance from "../../display/TokenBalance/TokenBalance";
import useGetSwapLink from "module/common/hook/useGetSwapLink";
import { Linking } from "react-native";
import { TokenDetailsCardButton, TokenDetailsCardRoot } from "./TokenDetailsCard.styles";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { AssetType } from "module/wallet/wallet.types";

export interface TokenDetailsCardProps {
    token: Token;
}

const TokenDetailsCard = ({ token }: TokenDetailsCardProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const uriSwap = useGetSwapLink({ contractId: token.contractId });

    function handleOnSwapButtonPress(): void {
        Linking.openURL(uriSwap);
    }

    function handleOnSendButtonPress(): void {
        showModal(SendModal, { defaultAsset: { type: AssetType.FT, ft: token } });
    }

    return (
        <TokenDetailsCardRoot gap={16} textAlign="center">
            <TokenBalance
                balanceProps={{ variant: "body1Strong" }}
                fiatBalanceProps={{ variant: "body4Strong" }}
                token={token}
                alignItems="center"
            />
            <Row gap={8}>
                <TokenDetailsCardButton variant="quaternary" size="lg" onPress={handleOnSendButtonPress}>
                    {capitalize(translate("send"))}
                </TokenDetailsCardButton>
                <TokenDetailsCardButton variant="quaternary" size="lg" onPress={handleOnSwapButtonPress}>
                    {capitalize(translate("swap"))}
                </TokenDetailsCardButton>
            </Row>
        </TokenDetailsCardRoot>
    );
};

export default TokenDetailsCard;
