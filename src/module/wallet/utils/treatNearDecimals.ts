/**
 * Returns a number of decimals (maximum 6) depending on the number of integers in balance
 */
import { BalanceOperations } from "module/sdk";

export const NEAR_LIMIT_DECIMAL = 0.00001;

export const getNearDecimals = (balance: number | string): number => {
    const separator = balance.toString().indexOf(".");
    const entire_number = balance.toString().slice(0, separator).length;

    return entire_number > 6 ? 0 : 6 - entire_number;
};

export const balanceBelowMinimum = (balance: string): boolean => {
    return Number(balance) < NEAR_LIMIT_DECIMAL && BalanceOperations.BNIsBigger(balance, "0");
};
