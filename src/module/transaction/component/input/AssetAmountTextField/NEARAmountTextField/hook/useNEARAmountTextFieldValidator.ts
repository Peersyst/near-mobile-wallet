import { config } from "config";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import useGetBalance from "module/wallet/query/useGetBalance";
import { isNEARAmountGreaterOrEqualThanThreshold, isNEARAmountGreaterThanThreshold, subtractNearAmounts } from "near-peersyst-sdk";

export interface UseNEARAmountTextFieldValidatorParams {
    amount: string;
    index: number;
}
export interface UseNEARAmountTextFieldValidatorResult {
    error: TextFieldProps["error"];
}

export const useNEARAmountTextFieldValidator = ({
    amount,
    index,
}: UseNEARAmountTextFieldValidatorParams): UseNEARAmountTextFieldValidatorResult => {
    const translateError = useTranslate("error");
    const { data: { available } = { available: "0" } } = useGetBalance(index);

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
        translateError("invalid_number_lte", { n: formattedMaxAvailable }),
    ];

    //Check if the amount is greater than zero
    const isGreaterThanZero = isNEARAmountGreaterThanThreshold(amount, "0");
    const finalNotGreaterThanZero: TextFieldProps["error"] = !isGreaterThanZero && [
        !isGreaterThanZero || amount === "",
        translateError("invalid_number_gt", { n: "0 " + config.tokenName }),
    ];

    //Check if the amount is at least the minimum amount available in NEAR. 1*10e-24 (1 yoctoNEAR)
    const formattedMinDecimal =
        "0." +
        Array(24 - 1)
            .fill(0)
            .join("") +
        "1";
    const isGreaterThanMinDecimal = isNEARAmountGreaterOrEqualThanThreshold(amount, formattedMinDecimal);
    const finalMinAmount: TextFieldProps["error"] = !isGreaterThanMinDecimal && [
        !isGreaterThanMinDecimal,
        translateError("invalid_number_gte", { n: "1 " + config.miniTokenUnit }),
    ];

    const error = finalMaxAmountError || finalNotGreaterThanZero || finalMinAmount;

    return {
        error,
    };
};
