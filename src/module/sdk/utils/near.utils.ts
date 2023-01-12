import { utils } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { BalanceOperations } from "./BalanceOperations";

/**
 * Convert Near amount to yocto
 * @param amountInNear
 * @returns The amount in yocto
 */
export function convertNearToYocto(amountInNear: string): string {
    return utils.format.parseNearAmount(amountInNear) ?? "0";
}

/**
 * Convert yocto to Near amount
 * @param amountInYocto
 * @returns The amount in Near
 */
export function convertYoctoToNear(amountInYocto: string, fracDigits?: number | undefined): string {
    return utils.format.formatNearAmount(amountInYocto, fracDigits);
}

/**
 * Subtract Near amount from another Near amount
 */
export function subtractNearAmounts(amount1: string, amount2: string): string {
    const amount1InYocto = convertNearToYocto(amount1);
    const amount2InYocto = convertNearToYocto(amount2);
    return convertYoctoToNear(BalanceOperations.BNSubtract(amount1InYocto, amount2InYocto));
}

/**
 *
 * @param amount In NEAR
 * @param threshold In NEAR
 * @returns If amount is greater than threshold
 */
export function isNEARAmountGreaterThanThreshold(amount: string, threshold: string): boolean {
    const amountInYocto = convertNearToYocto(amount);
    const thresholdInYocto = convertNearToYocto(threshold);
    return BalanceOperations.BNIsBigger(amountInYocto, thresholdInYocto);
}

/**
 * Convert AccountBalance in yocto to Near amount
 */
export function convertAccountBalanceToNear(
    { total, available, staked, stateStaked }: AccountBalance,
    fracDigits?: number | undefined,
): AccountBalance {
    return {
        total: convertYoctoToNear(total, fracDigits),
        available: convertYoctoToNear(available, fracDigits),
        staked: convertYoctoToNear(staked, fracDigits),
        stateStaked: convertYoctoToNear(stateStaked, fracDigits),
    };
}

export function parseBlockTimestamp(blockTimestamp: string): string {
    return parseInt(blockTimestamp.toString().slice(0, 13), 10).toString();
}

export function formatTokenAmount(amount: string, decimals: string, precision?: number): string {
    const denominator = BalanceOperations.BNExp(10, parseInt(decimals, 10));
    return BalanceOperations.BNDevide(amount, denominator).slice(0, precision ?? Number(decimals));
}

/**
 * @param amount Amount to remove unused rigth zeros
 * @returns 0400 becomes 04, 0.400 becomes 0.4, 0.4000 becomes 0.4
 */
export const removeTrailingZeros = (amount: string): string => amount.replace(/\.?0*$/, "");

/**
 * @param amount Amount to remove unused left zeros
 * @returns 0400 becomes 400
 */
export const removeLeftZeros = (amount: string): string => amount.replace(/^0+/, "");

export function parseTokenAmount(amount: string, tokenDecimals: string): string {
    const [integer, decimals] = amount.split(".");
    const finalTokenDecimals = parseInt(tokenDecimals, 10);
    if (decimals) {
        const baseNumOfDecimals = removeTrailingZeros(decimals).length;
        const finalDecimals = decimals.slice(0, Math.min(baseNumOfDecimals, finalTokenDecimals));
        const tempAmount = `${integer}${finalDecimals}`;
        const finalNumOfDecimals = finalTokenDecimals - finalDecimals.length;
        const factor = BalanceOperations.BNExp(10, finalNumOfDecimals);
        return removeLeftZeros(BalanceOperations.BNMultiply(tempAmount, factor));
    } else {
        const factor = BalanceOperations.BNExp(10, finalTokenDecimals);
        return BalanceOperations.BNMultiply(integer, factor);
    }
}

/**
 *
 * @param amount In Token as a Number (not BigInt)
 * @param threshold n Token as a Number (not BigInt)
 * @returns If amount is greater than threshold
 */
export function isTokenAmountGreaterThanThreshold(amount: string, threshold: string, decimals: string): boolean {
    const BNTokenAmount = parseTokenAmount(amount, decimals);
    const BNTokenThreshold = parseTokenAmount(threshold, decimals);
    return BalanceOperations.BNIsBigger(BNTokenAmount, BNTokenThreshold);
}
