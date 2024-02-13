import { config } from "refactor/common/config";
import { SignerRequestService } from "refactor/data-access/api/service";
import Queries from "../../../refactor/ui/common/query/queries";
import { useQuery } from "react-query";

export default function useGetSignerRequest(id: string) {
    return useQuery([Queries.GET_SIGNER_REQUEST, id], () => SignerRequestService.getSignerRequest(id), {
        enabled: config.signerFeature.enabled,
    });
}
