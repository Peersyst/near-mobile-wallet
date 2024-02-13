import { useQueryClient } from "react-query";
import { QueryKey, RefetchOptions } from "react-query/types/core/types";

export const useInvalidateQueries = (): ((queryKeys: QueryKey[], options?: RefetchOptions) => Promise<void>) => {
    const queryClient = useQueryClient();

    async function refetch(queryKeys: QueryKey[], options?: RefetchOptions): Promise<void> {
        await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey }, options)));
    }

    return refetch;
};
