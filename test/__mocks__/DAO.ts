import { DAOBalance } from "module/common/service/mock/CkbServiceMock.types";

export const MockedDAOBalance: DAOBalance = {
    daoDeposit: Math.floor((new Date().getSeconds() / 60) * 876),
    daoCompensation: 2.4,
};
