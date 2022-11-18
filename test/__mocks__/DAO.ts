import { DAOBalance, DAOUnlockableAmount } from "near-peersyst-sdk";

export const MockedDAOBalance: DAOBalance = {
    daoDeposit: 500,
    daoCompensation: 500,
};

export const MockedUnlockableAmounts: DAOUnlockableAmount[] = [
    {
        amount: BigInt(500 * 10 ** 8),
        compensation: BigInt(500 * 10 ** 8),
        unlockable: false,
        remainingCycleMinutes: 23434,
        type: "deposit",
        txHash: "0x805168dafc0c10ae31de2580541db0f5ee8ff53afb55e39a5e2eeb60f878553f",
        remainingEpochs: 23,
    },
    {
        amount: BigInt(500 * 10 ** 8),
        compensation: BigInt(12 * 10 ** 8),
        unlockable: true,
        remainingCycleMinutes: 50,
        remainingEpochs: 23,
        type: "withdraw",
        txHash: "0x6d22619e2866924f585b440543927bb4d21b8bdfac6e415fa156fc66f6a97af0",
    },
    {
        amount: BigInt(50 * 10 ** 8),
        compensation: BigInt(3 * 10 ** 8),
        unlockable: false,
        remainingCycleMinutes: 45,
        remainingEpochs: 23,
        type: "withdraw",
        txHash: "0x6d22619e2866924f585b440543927bb4d21b8bdfac6e415fa156fc66f6a97af0",
    },
];
