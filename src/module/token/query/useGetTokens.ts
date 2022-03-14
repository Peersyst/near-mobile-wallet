import { useQuery } from "react-query";
import getTokens from "../mock/getTokens";

const useGetTokens = (address?: string): any =>
    useQuery(["tokens", address], () => (address ? getTokens(address) : new Promise((resolve) => setTimeout(() => resolve([]), 600))));

export default useGetTokens;
