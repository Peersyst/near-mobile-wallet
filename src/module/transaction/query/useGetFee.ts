import { useQuery } from "react-query";
import getFee from "module/transaction/mock/getFee";

const useGetFee = (feeType: string) => useQuery(["fee", feeType], () => getFee(feeType));

export default useGetFee;
