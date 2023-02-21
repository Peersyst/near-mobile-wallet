import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import useServiceInstance from "../hook/useServiceInstance";

export function useInvalidateServiceInstanceQueries(index?: number) {
    const { index: usedIndex, network } = useServiceInstance(index);
    const invalidateAllQueries = useInvalidateQueries();
    async function handleInvalidate(queryKeys: string[]) {
        const queries = queryKeys.map((key) => [key, usedIndex, network]);
        await invalidateAllQueries(queries);
    }
    return handleInvalidate;
}
