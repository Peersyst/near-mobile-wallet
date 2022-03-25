import { useQuery } from "react-query";
import getFee from "module/transaction/mock/getFee";
import { FeeType } from "module/settings/state/SettingsState";

const useGetFee = (feeType: FeeType) => useQuery(["fee", feeType], () => getFee(feeType));

export default useGetFee;
