import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { isTokenAmountGreaterThanThreshold, Token } from "near-peersyst-sdk";

export interface UseFtAmountInputValidatorParams {
    amount: string;
    ft: Token;
}
export interface UseFtAmountInputValidatorResult {
    error: TextFieldProps["error"];
}

export const useFTAmountInputValidator = ({ amount, ft }: UseFtAmountInputValidatorParams): UseFtAmountInputValidatorResult => {
    const translateError = useTranslate("error");
    const {
        balance,
        metadata: { symbol, decimals },
    } = ft;
    //Check if amount is less than available balance
    const isGreaterThanMax = isTokenAmountGreaterThanThreshold(amount, balance, decimals);
    const formattedMaxAvailable = useFormatBalance(balance, {
        units: symbol,
        unitsPosition: "right",
        numberFormatOptions: { maximumFractionDigits: 6 },
    });
    const finalMaxAmountError: TextFieldProps["error"] = isGreaterThanMax && [
        isGreaterThanMax,
        translateError("invalid_number_lt", { n: formattedMaxAvailable }),
    ];

    //Check if the amount is greater than zero
    const isGreaterThanZero = isTokenAmountGreaterThanThreshold(amount, "0", decimals);
    const finalMinAmountGreaterThanZero: TextFieldProps["error"] = !isGreaterThanZero && [
        !isGreaterThanZero,
        translateError("invalid_number_gt", { n: "0 " + symbol }),
    ];

    //Check the amount is greater than the minDecimal

    const formatedMinDecimal =
        "0." +
        Array(parseInt(decimals, 10) - 1)
            .fill(0)
            .join("") +
        "1";
    const isGreaterThanMinDecimal = isTokenAmountGreaterThanThreshold(amount, formatedMinDecimal, decimals);
    const formattedMinDecimal = useFormatBalance(formatedMinDecimal, {
        units: symbol,
        unitsPosition: "right",
        numberFormatOptions: { minimumFractionDigits: parseInt(decimals, 10) },
    });
    const finalMinAmountError: TextFieldProps["error"] = !isGreaterThanMinDecimal && [
        !isGreaterThanMinDecimal,
        translateError("invalid_number_gt", { n: formattedMinDecimal }),
    ];

    const error = finalMaxAmountError || finalMinAmountGreaterThanZero || finalMinAmountError;

    return {
        error,
    };
};
