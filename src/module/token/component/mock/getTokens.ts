import { TokenAmount } from "module/token/types";
import { tokens } from "./token";

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTransactions = (address: string): Promise<TokenAmount[]> =>
    new Promise((resolve) => setTimeout(() => resolve(tokens), 2000));

export default getTransactions;
