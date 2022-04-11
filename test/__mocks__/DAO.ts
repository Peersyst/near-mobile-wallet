import { DAOBalance, DAOUnlockableAmount } from "module/common/service/mock/CkbServiceMock.types";

export const MockedDAOBalance: DAOBalance = {
    daoDeposit: BigInt(500),
    daoCompensation: BigInt(500),
};

export const MockedUnlockableAmounts: DAOUnlockableAmount[] = [
    {
        amount: BigInt(500),
        compensation: BigInt(500),
        unlockable: true,
        unlockableDate: new Date("2022-03-23T18:48:21.881Z"),
        type: "single",
        txHash: "0x805168dafc0c10ae31de2580541db0f5ee8ff53afb55e39a5e2eeb60f878553f",
    },
    {
        amount: BigInt(50),
        compensation: BigInt(1726740516),
        unlockable: true,
        unlockableDate: new Date("2022-03-26T16:22:20.642Z"),
        type: "single",
        txHash: "0x6d22619e2866924f585b440543927bb4d21b8bdfac6e415fa156fc66f6a97af0",
    },
];
