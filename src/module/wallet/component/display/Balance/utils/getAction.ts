import { BalanceAction, BalanceActions } from "../Balance.types";
import { isZero } from "./balance.utils";

export const getAction = (balance: string, decimals: number | undefined): BalanceAction | undefined => {
    const isZeroBalance = isZero(balance);
    if (isZeroBalance) return BalanceActions.DISPLAY;
    return decimals === -1 ? BalanceActions.LESS : undefined;
};
