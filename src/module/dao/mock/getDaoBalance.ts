import { DaoBalanceType } from "../types";
import { DaoBalance } from "./daoBalance";

//eslint-disable-next-line
export default function (): Promise<DaoBalanceType> {
    return new Promise((resolve) => setTimeout(() => resolve(DaoBalance), 2000));
}
