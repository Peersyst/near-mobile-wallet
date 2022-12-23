import { utils } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { MathOperations } from "./MathOperations";

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

export function parseTokenAmount(amount: string, decimals: string, precision = 6): string {
    const denominator = MathOperations.BNExp(10, parseInt(decimals, 10));
    return MathOperations.BNDevide(amount, denominator).slice(0, precision);
}
