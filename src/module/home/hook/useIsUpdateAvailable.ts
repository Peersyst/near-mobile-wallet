import * as Updates from "expo-updates";
import Queries from "../../../query/queries";
import { UseQueryResult, useQuery } from "react-query";

export type UseIsUpdateAvailableReturn = UseQueryResult<boolean, unknown>;

const useIsUpdateAvailable = (): UseIsUpdateAvailableReturn => {
    return useQuery([Queries.GET_UPDATE_AVAILABLE], async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            return update.isAvailable;
        } catch (error) {
            return false;
        }
    });
};

export default useIsUpdateAvailable;
