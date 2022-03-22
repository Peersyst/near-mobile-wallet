import { useQuery } from "react-query";
import getBalance from "module/wallet/mock/getBalance";

const useGetBalance = (address: string) => useQuery(["balance", address], () => getBalance(address));

export default useGetBalance;
