import { BalanceThreshold } from "../Balance.types";

/**
 * @param amount Amount to remove unused rigth zeros
 * @returns 0400 becomes 04, 0.400 becomes 0.4, 0.4000 becomes 0.4
 */
export const removeTrailingZeros = (amount: string): string => amount.replace(/\.?0*$/, "");

/**
 * @param zeros The number of zeros to add
 * @param decimal The decimal part of the number to format (4 instead of 0.4)
 * @returns The decimal part with the zeros added to the end of it (p.e. 4 + 2 zeros = 400)
 */
export const addZerosToDecimal = (zeros: number, decimal: string): string => {
    const decimalWithZeros = decimal;
    const zero = "0";
    return decimalWithZeros.concat(zero.repeat(zeros));
};

/**
 * @param decimal The decimal part of the number to format (4 instead of 0.4)
 * @param minNumberOfDecimals The minimum number of decimals that the decimal part should have
 * @returns The decimal part with the minimum number of decimals (p.e. 4 + 2 zeros = 400)
 */
export const formatDecimalWithMinNumberOfDecimals = (decimal: string, minNumberOfDecimals: number): string => {
    if (decimal.length === minNumberOfDecimals) return decimal;
    const decimalsToAdd = minNumberOfDecimals - decimal.length;
    return addZerosToDecimal(decimalsToAdd, decimal);
};

/**
 * @param thresholds
 * @returns The minimum threshold value
 */
export const getTheMinimumThreshold = (thresholds: BalanceThreshold[]): BalanceThreshold["value"] => {
    return thresholds[thresholds.length - 1].value;
};

/**
 * @param number - number in string format
 * @returns true if the number is zero, false otherwise
 */
export function isZero(number: string): boolean {
    const [int, dec] = number.split(".");
    const isIntZero = BigInt(int || "0").toString() === "0";
    const isDecZero = dec === undefined || BigInt(dec).toString() === "0";
    return isIntZero && isDecZero;
}
