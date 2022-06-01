import { useQueryClient } from "react-query";
import { QueryKey, RefetchOptions } from "react-query/types/core/types";

export const useRefetchQuery = (): ((queryKey: QueryKey, options?: RefetchOptions) => Promise<void>) => {
    const queryClient = useQueryClient();

    async function refetch(queryKey: QueryKey, options?: RefetchOptions): Promise<void> {
        await queryClient.refetchQueries({ queryKey, exact: true }, options);
    }

    return refetch;
};
