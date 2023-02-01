import { BalanceThreshold } from "module/wallet/component/display/Balance/Balance.types";

export const THRESHOLDS: BalanceThreshold[] = [
    {
        value: 100000,
        decimals: 0,
    },
    {
        value: 100,
        decimals: 2,
    },
    {
        value: 1,
        decimals: 4,
    },
    {
        value: 0.00001,
        decimals: 6,
    },
];
