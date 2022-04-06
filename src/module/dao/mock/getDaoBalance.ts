import { DaoBalanceType } from "../types";
import { DAOBalance } from "./DAOBalance";

//eslint-disable-next-line
export default function (): Promise<DaoBalanceType> {
    return new Promise((resolve) => setTimeout(() => resolve(DAOBalance), 2000));
}
