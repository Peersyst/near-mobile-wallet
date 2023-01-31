import { BalanceThreshold } from "module/wallet/component/display/Balance/Balance.types";

export const getDecimalsFromThreshold = (balance: string, thresholds: BalanceThreshold[]): number | undefined => {
    const [int, dec] = balance.split(".");
    if (int === undefined && dec === undefined) return 0;

    const finalInt = BigInt(int);
    const finalDec = dec || "0";

    // Cas número 0: p.e. 0
    if (finalInt === BigInt(0) && dec === undefined) return 0;

    const threshold = thresholds.find((threshold) => {
        const [thresholdInt, thresholdDec] = threshold.value.toString().split(".");
        const bigIntThreshold = BigInt(thresholdInt);
        const thresholdDecimal = thresholdDec || "";

        if (finalInt > bigIntThreshold) {
            return true;
        } else if (finalInt === bigIntThreshold) {
            if (finalDec.length < thresholdDecimal.length) {
                const finalDecWithZeros = addZerosToDecimal(thresholdDecimal.length - finalDec.length, finalDec);
                return BigInt(finalDecWithZeros) >= BigInt(thresholdDecimal);
            } else if (finalDec.length > thresholdDecimal.length) {
                const thresholdDecWithZeros = addZerosToDecimal(finalDec.length - thresholdDecimal.length, thresholdDecimal);
                return BigInt(finalDec) >= BigInt(thresholdDecWithZeros);
            }
            return BigInt(finalDec) >= BigInt(thresholdDec);
        }
        return false;
    });

    return threshold?.decimal;
};

export const getMaxThreshold = (thresholds: BalanceThreshold[]): BalanceThreshold => {
    return thresholds[thresholds.length - 1];
};

export const addZerosToDecimal = (zeros: number, decimal: string): string => {
    const decimalWithZeros = decimal;
    const zero = "0";
    return decimalWithZeros.concat(zero.repeat(zeros));
};
