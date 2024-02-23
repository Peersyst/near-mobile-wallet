import { utils } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { BalanceOperations } from "./BalanceOperations";
import BigNumber from "bignumber.js";

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
    return utils.format.formatNearAmount(amountInYocto, fracDigits).replace(/,/g, "");
}

/**
 * Subtract Near amount from another Near amount
 */
export function substractNearAmounts(amount1: string, amount2: string): string {
    const amount1InYocto = convertNearToYocto(amount1);
    const amount2InYocto = convertNearToYocto(amount2);
    return convertYoctoToNear(subtractYoctoAmounts(amount1InYocto, amount2InYocto));
}

/**
 * Add Near amounts. Both amount has to be in NEAR
 */
export function addNearAmounts(amount1: string, amount2: string): string {
    const amount1InYocto = convertNearToYocto(amount1);
    const amount2InYocto = convertNearToYocto(amount2);
    return convertYoctoToNear(addYoctoAmounts(amount1InYocto, amount2InYocto));
}

export function addYoctoAmounts(amount1: string, amount2: string): string {
    return BalanceOperations.BNAdd(amount1, amount2);
}

export function subtractYoctoAmounts(amount1: string, amount2: string): string {
    return BalanceOperations.BNSubtract(amount1, amount2);
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
 *
 * @param amount In NEAR
 * @param threshold In NEAR
 * @returns If amount is greater or equal than threshold
 */
export function isNEARAmountGreaterOrEqualThanThreshold(amount: string, threshold: string): boolean {
    const amountInYocto = convertNearToYocto(amount);
    const thresholdInYocto = convertNearToYocto(threshold);
    return BalanceOperations.BNIsBiggerOrEqual(amountInYocto, thresholdInYocto);
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

/**
 * @returns Return number version of token amount
 */
export function formatTokenAmount(amount: string, decimals: string, precision?: number): string {
    return BigNumber(amount)
        .shiftedBy(-(precision ?? Number(decimals)))
        .toString();
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

/**
 * @returns Number to BigInt
 */
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

/**
 *
 * @param amount In Token as a Number (not BigInt)
 * @param threshold n Token as a Number (not BigInt)
 * @returns If amount is greater or equal than threshold
 */
export function isTokenAmountGreaterOrEqualThanThreshold(amount: string, threshold: string, decimals: string): boolean {
    const BNTokenAmount = parseTokenAmount(amount, decimals);
    const BNTokenThreshold = parseTokenAmount(threshold, decimals);
    return BalanceOperations.BNIsBiggerOrEqual(BNTokenAmount, BNTokenThreshold);
}
