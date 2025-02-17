import { Row } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { IntentsTokenBalance as IItentsTokenBalance } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import { IntentsTokenDetailsCardButton, IntentsTokenDetailsCardRoot } from "./IntentsTokenDetailsCard.styles";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import IntentsTokenBalance from "../IntentsTokenBalance/IntentsTokenBalance";
import useGetIntentsLink from "module/common/hook/useGetIntentsLink";

export interface IntentsTokenDetailsCardProps {
    token: IItentsTokenBalance;
    onWithdraw?: () => void;
    onSwap?: () => void;
}

const IntentsTokenDetailsCard = ({ token, onWithdraw, onSwap }: IntentsTokenDetailsCardProps): JSX.Element => {
    const translate = useTranslate();
    const { navigate } = useNavigation();

    const uriSwap = useGetIntentsLink({ type: "swap" });
    const uriWithdraw = useGetIntentsLink({ type: "withdraw" });

    function handlePress(type: "swap" | "withdraw"): void {
        const uri = type === "swap" ? uriSwap : uriWithdraw;

        setTimeout(() => {
            // We need to cast the navigate.navigate to any because the React Navigation types are not working properly
            navigate(MainScreens.DAPPS, { screen: DAppScreens.WEBVIEW, params: { url: uri } } as any);
        }, 500);
    }

    function handleSwapPress(): void {
        handlePress("swap");
        onSwap?.();
    }

    function handleWithdrawPress(): void {
        handlePress("withdraw");
        onWithdraw?.();
    }

    return (
        <IntentsTokenDetailsCardRoot variant="gray">
            <IntentsTokenBalance
                balanceProps={{ variant: "body1Strong" }}
                fiatBalanceProps={{ variant: "body4Strong" }}
                token={token}
                alignItems="center"
            />
            <Row gap={8}>
                <IntentsTokenDetailsCardButton size="lg" variant="quaternary" onPress={handleSwapPress}>
                    {capitalize(translate("swap"))}
                </IntentsTokenDetailsCardButton>
                <IntentsTokenDetailsCardButton size="lg" variant="quaternary" onPress={handleWithdrawPress}>
                    {capitalize(translate("withdraw"))}
                </IntentsTokenDetailsCardButton>
            </Row>
        </IntentsTokenDetailsCardRoot>
    );
};

export default IntentsTokenDetailsCard;
