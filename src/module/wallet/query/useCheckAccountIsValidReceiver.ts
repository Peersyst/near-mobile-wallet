import { useQuery, UseQueryResult } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import Queries from "../../../query/queries";
import useGetSuffix from "../hook/useGetSuffix";

const useCheckAccountIsValidReceiver = (walletIndex: number, account: string): UseQueryResult<boolean> => {
    const { serviceInstance, network, queryEnabled } = useServiceInstance(walletIndex);
    const suffix = useGetSuffix();
    const enabled = !!account && account !== suffix && account !== "" && queryEnabled;

    return useQuery(
        [Queries.ACCOUNT_VALID_RECEIVER, account, network],
        async () => {
            return await serviceInstance?.acccountIsValidReceivingAccount(account);
        },
        {
            enabled,
            cacheTime: 0,
        },
    );
};

export default useCheckAccountIsValidReceiver;
