import { config } from "config";
import { SignerRequestService } from "module/api/service";
import Queries from "../../../query/queries";
import { useQuery } from "react-query";

export default function useGetSignerRequest(id: string) {
    return useQuery([Queries.GET_SIGNER_REQUEST, id], () => SignerRequestService.getSignerRequest(id), {
        enabled: config.signerFeature.enabled,
    });
}
