import { useQuery } from "react-query";
import getTokens from "../mock/getTokens";

const useGetTokens = (address?: string) => useQuery(["tokens", address], () => (address ? getTokens(address) : []));

export default useGetTokens;
