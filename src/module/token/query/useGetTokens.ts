import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import getTokens from "../mock/getTokens";
import { TokenAmount } from "../types";

const useGetTokens = (address?: string): QueryResult<TokenAmount[]> =>
    useQuery(["tokens", address], () => (address ? getTokens(address) : new Promise((resolve) => setTimeout(() => resolve([]), 600))));

export default useGetTokens;
