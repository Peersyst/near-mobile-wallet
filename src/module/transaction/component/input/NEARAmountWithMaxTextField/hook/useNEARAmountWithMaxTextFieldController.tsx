import { config } from "config";
import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import { useTranslate } from "module/common/hook/useTranslate";
import settingsState from "module/settings/state/SettingsState";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { FIAT_THRESHOLDS } from "module/wallet/component/display/FiatBalance/fiatThresholds";
import useGetBalance from "module/wallet/query/useGetBalance";
import { isNEARAmountGreaterThanThreshold, substractNearAmounts } from "near-peersyst-sdk";
import { useRecoilValue } from "recoil";

export interface UseNEARAmountWithMaxTextFieldControllerParams {
    index?: number;
    maxAmount?: string;
    fee?: string;
}

export function useNEARAmountWithMaxTextFieldController({
    index,
    maxAmount,
    fee = config.estimatedFee,
}: UseNEARAmountWithMaxTextFieldControllerParams) {
    const translate = useTranslate();
    const { data: { available: availableBalance } = { available: "0" } } = useGetBalance(index);

    const finalAvailable = maxAmount ? maxAmount : availableBalance;
    const hasEnoughBalance = isNEARAmountGreaterThanThreshold(finalAvailable, fee);
    const maxBalance = hasEnoughBalance ? substractNearAmounts(finalAvailable, fee) : finalAvailable;

    const { value: maxBalanceInFiat = "0" } = useNativeTokenConversion(maxBalance);
    const { fiat } = useRecoilValue(settingsState);

    const formattedBalanceInFiat = useFormatBalance(maxBalanceInFiat, {
        units: fiat,
        action: "round",
        thresholds: FIAT_THRESHOLDS,
        minimumFallbackDisplay: "0.01",
    });

    const formattedBalance = useFormatBalance(maxBalance, {
        units: config.tokenName,
        action: "round",
    });

    return {
        hint: translate("available_balance", { amount: formattedBalance, amount_price: formattedBalanceInFiat })!,
        maxBalance,
    };
}
