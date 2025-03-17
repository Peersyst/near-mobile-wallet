import { IntentsToken, IntentsTokenBalance } from "../intents.types";

/**
 * Receives an IntentsToken and fills it with empty balance values.
 * @param intentsToken The IntentsToken to fill with empty balance values.
 * @returns The IntentsToken with empty balance values.
 */
export function getEmptyIntentsTokenBalance(intentsToken: IntentsToken): IntentsTokenBalance {
    return {
        ...intentsToken,
        chainBalances: [],
        totalBalance: "0",
        totalDepositedBalance: "0",
        totalTransitBalance: "0",
    };
}
