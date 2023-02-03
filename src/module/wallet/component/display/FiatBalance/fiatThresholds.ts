import { BalanceThreshold } from "../Balance/Balance.types";

export const FIAT_THRESHOLDS: BalanceThreshold[] = [
    {
        value: 1000000,
        decimals: 0,
    },
    {
        value: 100000,
        decimals: 1,
    },
    {
        value: 0.01,
        decimals: 2,
    },
];
