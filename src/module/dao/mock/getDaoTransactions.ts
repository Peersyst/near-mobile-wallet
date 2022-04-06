import { Transaction } from "module/transaction/types";
import { DAOTransactions } from "./DAOTransactions";

//eslint-disable-next-line
export default function (): Promise<Transaction[]> {
    return new Promise((resolve) => setTimeout(() => resolve(DAOTransactions), 2000));
}
