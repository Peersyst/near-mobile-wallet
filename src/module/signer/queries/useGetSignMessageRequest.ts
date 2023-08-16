import { SignerRequestService } from "module/api/service";
import Queries from "../../../query/queries";
import { useQuery } from "react-query";
import { config } from "config";

export default function useGetSignMessageRequest(id: string) {
    return useQuery([Queries.GET_SIGN_MESSAGE_REQUEST, id], () => SignerRequestService.getSignMessageRequest(id), {
        enabled: config.signerFeature.enabled,
    });
}
