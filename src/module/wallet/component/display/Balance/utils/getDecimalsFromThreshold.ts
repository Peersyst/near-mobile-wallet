import { BalanceThreshold } from "module/wallet/component/display/Balance/Balance.types";
import { formatDecimalWithMinNumberOfDecimals, removeTrailingZeros } from "./balance.utils";

export const getDecimalsFromThreshold = (balance: string, thresholds: BalanceThreshold[]): number | undefined => {
    const [intBalance, tempDecBalance] = balance.split(".");
    if (intBalance === undefined) return;

    const intBalanceAsBigInt = BigInt(intBalance);
    const decBalance = removeTrailingZeros(tempDecBalance || "0");

    const threshold = thresholds.find((threshold) => {
        const [intThreshold, tempDecThreshold] = threshold.value.toString().split(".");
        const intThresholdAsBigInt = BigInt(intThreshold);
        const decThreshold = removeTrailingZeros(tempDecThreshold || "0");

        if (intBalanceAsBigInt > intThresholdAsBigInt) {
            return true;
        } else if (intBalanceAsBigInt.toString() === intThresholdAsBigInt.toString()) {
            const currentLength = Math.max(decBalance.length, decThreshold.length);
            const finalDecBalance = formatDecimalWithMinNumberOfDecimals(decBalance, currentLength);
            const finalDecThreshold = formatDecimalWithMinNumberOfDecimals(decThreshold, currentLength);
            return BigInt(finalDecBalance) >= BigInt(finalDecThreshold);
        }
        return false;
    });

    return threshold?.decimals === undefined ? -1 : threshold.decimals;
};
