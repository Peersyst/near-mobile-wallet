import { DAOBalance, DAOUnlockableAmount } from "module/common/service/mock/CkbServiceMock.types";

export const MockedDAOBalance: DAOBalance = {
    daoDeposit: 594.323,
    daoCompensation: 2.4,
};

export const MockedUnlockableAmounts: DAOUnlockableAmount[] = [
    {
        amount: 12345 as any,
        compensation: 13654624 as any,
        unlockable: true,
        unlockableDate: new Date("2022-03-23T18:48:21.881Z"),
        type: "single",
        txHash: "0x805168dafc0c10ae31de2580541db0f5ee8ff53afb55e39a5e2eeb60f878553f",
    },
    {
        amount: 50 as any,
        compensation: 1726740516 as any,
        unlockable: true,
        unlockableDate: new Date("2022-03-26T16:22:20.642Z"),
        type: "single",
        txHash: "0x6d22619e2866924f585b440543927bb4d21b8bdfac6e415fa156fc66f6a97af0",
    },
];
