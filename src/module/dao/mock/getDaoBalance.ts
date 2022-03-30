import { DaoBalanceType } from "../types";

const MockedDaoBalance:DaoBalanceType = {
    availableBalance: "12635.304223",
    lockedBalance: "594.323",
    currentAPC: "2.4"
}
//eslint-disable-next-line
export default function (): Promise<DaoBalanceType> {
    return new Promise((resolve) => setTimeout(() => resolve(MockedDaoBalance), 2000));
}