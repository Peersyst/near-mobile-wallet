import { utils } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";

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
export function convertYoctoToNear(amountInYocto: string): string {
    return utils.format.formatNearAmount(amountInYocto);
}

/**
 * Convert AccountBalance in yocto to Near amount
 */
export function convertAccountBalanceToNear({ total, available, staked, stateStaked }: AccountBalance): AccountBalance {
    return {
        total: convertYoctoToNear(total),
        available: convertYoctoToNear(available),
        staked: convertYoctoToNear(staked),
        stateStaked: convertYoctoToNear(stateStaked),
    };
}
