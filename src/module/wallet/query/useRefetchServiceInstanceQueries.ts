import { useRefetchQueries } from "../../../query/useRefetchQueries";
import useServiceInstance from "../hook/useServiceInstance";

export function useRefetchServiceInstanceQueries(index?: number) {
    const { index: usedIndex, network } = useServiceInstance(index);
    const refetchQueries = useRefetchQueries();
    async function handleRefetch(queryKeys: string[]) {
        const queries = queryKeys.map((key) => [key, usedIndex, network]);
        await refetchQueries(queries);
    }
    return handleRefetch;
}
