import { DAOBalance } from "module/common/service/mock/CkbServiceMock.types";

export function getAPC(params?: DAOBalance): number {
    if (params === undefined || params.daoDeposit === BigInt(0)) return 0;
    else {
        const { daoDeposit, daoCompensation } = params;
        return (Number(daoCompensation) / Number(daoDeposit)) * 100;
    }
}
