import { config } from "config";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import useGetBalance from "module/wallet/query/useGetBalance";
import { isNEARAmountGreaterThanThreshold, subtractNearAmounts } from "near-peersyst-sdk";

export interface UseNEARAmountInputValidatorParams {
    amount: string;
    index: number;
}
export interface UseNEARAmountInputValidatorResult {
    error: TextFieldProps["error"];
}

export const useNEARAmountInputValidator = ({ amount, index }: UseNEARAmountInputValidatorParams): UseNEARAmountInputValidatorResult => {
    const translateError = useTranslate("error");
    const { data: { available } = { available: "0" } } = useGetBalance(index);

    //Check if has enough balance
    const hasEnoughBalance = isNEARAmountGreaterThanThreshold(available, config.estimatedFee);
    const finalHasEnoughBalanceError: TextFieldProps["error"] = !hasEnoughBalance && [
        !hasEnoughBalance,
        translateError("insufficient_balance"),
    ];

    //Check if amount is less than available balance minus the fee
    const finalAvailable = subtractNearAmounts(available, config.estimatedFee);
    const isGreaterThanMax = isNEARAmountGreaterThanThreshold(amount, finalAvailable);
    const formattedMaxAvailable = useFormatBalance(finalAvailable, {
        units: "token",
        unitsPosition: "right",
        numberFormatOptions: { maximumFractionDigits: 6 },
    });
    const finalMaxAmountError: TextFieldProps["error"] = isGreaterThanMax && [
        isGreaterThanMax,
        translateError("invalid_number_lt", { n: formattedMaxAvailable }),
    ];

    //Check if the amount is greater than zero
    const isGreaterThanZero = isNEARAmountGreaterThanThreshold(amount, "0");
    const finalMinAmountError: TextFieldProps["error"] = !isGreaterThanZero && [
        !isGreaterThanZero || amount === "",
        translateError("invalid_number_gt", { n: "0 " + config.tokenName }),
    ];

    return {
        error: finalHasEnoughBalanceError || finalMaxAmountError || finalMinAmountError,
    };
};
