import { DaoBalanceType } from "../types";
import { DaoBalance } from "./DAOBalance";

//eslint-disable-next-line
export default function (): Promise<DaoBalanceType> {
    return new Promise((resolve) => setTimeout(() => resolve(DaoBalance), 2000));
}
