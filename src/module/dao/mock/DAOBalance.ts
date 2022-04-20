import { DAOBalance as DAOBalanceType } from "@peersyst/ckb-peersyst-sdk";

export const DAOBalance: DAOBalanceType = {
    daoDeposit: BigInt(Math.floor((new Date().getSeconds() / 60) * 876)),
    daoCompensation: BigInt(100),
};
