import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { isTokenAmountGreaterOrEqualThanThreshold, isTokenAmountGreaterThanThreshold, Token } from "near-peersyst-sdk";

export interface UseFtAmountTextFieldValidatorParams {
    amount: string;
    token: Token;
}
export interface UseFtAmountTextFieldValidatorResult {
    error: TextFieldProps["error"];
}

export const useFTAmountTextFieldValidator = ({
    amount,
    token,
}: UseFtAmountTextFieldValidatorParams): UseFtAmountTextFieldValidatorResult => {
    const translateError = useTranslate("error");
    const {
        balance,
        metadata: { symbol, decimals },
    } = token;

    const amountDecimals = amount.split(".")?.[1];
    const isAmountDecimalsGreaterThanTokenDecimals = amountDecimals ? amountDecimals.length > parseInt(decimals, 10) : false;
    //Check if amount is less than available balance
    const isGreaterThanMax = isTokenAmountGreaterThanThreshold(amount, balance, decimals);
    const formattedMaxAvailable = useFormatBalance(balance, {
        units: symbol,
        unitsPosition: "right",
        numberFormatOptions: { maximumFractionDigits: 6 },
    });
    const finalMaxAmountError: TextFieldProps["error"] = isGreaterThanMax && [
        isGreaterThanMax,
        translateError("invalid_number_lte", { n: formattedMaxAvailable }),
    ];

    //Check if the amount is greater than zero
    const isGreaterThanZero = isTokenAmountGreaterThanThreshold(amount, "0", decimals);
    const finalMinAmountGreaterThanZero: TextFieldProps["error"] = !isGreaterThanZero && [
        !isGreaterThanZero || amount === "",
        translateError("invalid_number_gt", { n: "0 " + symbol }),
    ];

    //Check the amount is greater than the minDecimal allowed by the definition of the token 1*10e-decimals
    const formattedMinDecimal =
        "0." +
        Array(parseInt(decimals, 10) - 1)
            .fill(0)
            .join("") +
        "1";
    const isGreaterThanMinDecimal = isTokenAmountGreaterOrEqualThanThreshold(amount, formattedMinDecimal, decimals);
    const finalMinAmountError: TextFieldProps["error"] = !isGreaterThanMinDecimal && [
        !isGreaterThanMinDecimal,
        translateError("invalid_number_gte", { n: "10^(-" + decimals + ") " + symbol }),
    ];

    const error = finalMaxAmountError || (isAmountDecimalsGreaterThanTokenDecimals ? finalMinAmountError : finalMinAmountGreaterThanZero);

    return {
        error,
    };
};
