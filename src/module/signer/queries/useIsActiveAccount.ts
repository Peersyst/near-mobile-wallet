import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../refactor/ui/common/query/queries";
import { useQuery } from "react-query";

export default function useIsAccountActive(walletIndex?: number) {
    const { serviceInstance, index, network } = useServiceInstance(walletIndex);

    return useQuery(
        [Queries.ACCOUNT_IS_ACTIVE, index, network],
        async () => {
            const accountId = await serviceInstance.getAccountId();
            return await serviceInstance.accountExists(accountId);
        },
        {
            enabled: !!serviceInstance,
            cacheTime: 0,
            staleTime: 0,
        },
    );
}
