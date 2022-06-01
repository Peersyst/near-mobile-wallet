import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { DAOTransactions } from "./daoTransactions";

//eslint-disable-next-line
export default function (): Promise<FullTransaction[]> {
    return new Promise((resolve) => setTimeout(() => resolve(DAOTransactions), 2000));
}
