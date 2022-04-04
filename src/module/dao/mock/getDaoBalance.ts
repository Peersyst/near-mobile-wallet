import { DAOBalance } from "module/common/service/mock/CkbServiceMock.types";
import { daoBalance } from "./daoBalance";

//eslint-disable-next-line
export default function (): Promise<DAOBalance> {
    return new Promise((resolve) => setTimeout(() => resolve(daoBalance), 2000));
}
