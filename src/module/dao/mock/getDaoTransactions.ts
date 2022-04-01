import { Transaction } from "module/transaction/types";
import { daoTransactions } from "./daoTransactions";

//eslint-disable-next-line
export default function (): Promise<Transaction[]> {
    return new Promise((resolve) => setTimeout(() => resolve(daoTransactions), 2000));
}
