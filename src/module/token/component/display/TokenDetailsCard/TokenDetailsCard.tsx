import { Row } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { Token } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import TokenBalance from "../../display/TokenBalance/TokenBalance";
import useGetSwapLink from "module/common/hook/useGetSwapLink";
import { TokenDetailsCardButton, TokenDetailsCardRoot } from "./TokenDetailsCard.styles";
import useHaveNearInAccount from "module/wallet/hook/useHaveNearInAccount";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";

export interface TokenDetailsCardProps {
    token: Token;
    onSend?: () => void;
    onSwap?: () => void;
}

const TokenDetailsCard = ({ token, onSend, onSwap }: TokenDetailsCardProps): JSX.Element => {
    const translate = useTranslate();
    const { navigate } = useNavigation();

    const uriSwap = useGetSwapLink({ contractId: token.contractId });
    const haveNearInAccount = useHaveNearInAccount();

    function handleSwapPress(): void {
        onSwap?.();
        setTimeout(() => {
            // We need to cast the navigate.navigate to any because the React Navigation types are not working properly
            navigate(MainScreens.DAPPS, { screen: DAppScreens.WEBVIEW, params: { url: uriSwap } } as any);
        }, 500);
    }

    return (
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
                <TokenDetailsCardButton size="lg" variant="quaternary" onPress={handleSwapPress} disabled={!haveNearInAccount}>
                    {capitalize(translate("swap"))}
                </TokenDetailsCardButton>
            </Row>
        </TokenDetailsCardRoot>
    );
};

export default TokenDetailsCard;
