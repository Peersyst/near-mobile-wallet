import { SignMessageRequestDto, SignerRequestService } from "refactor/data-access/api/service";
import Queries from "../../../query/queries";
import { UseQueryResult, useQuery } from "react-query";
import { config } from "refactor/common/config";

export default function useGetSignMessageRequest(id: string): UseQueryResult<SignMessageRequestDto, unknown> {
    return useQuery([Queries.GET_SIGN_MESSAGE_REQUEST, id], () => SignerRequestService.getSignMessageRequest(id), {
        enabled: config.signerFeature.enabled,
    });
}
