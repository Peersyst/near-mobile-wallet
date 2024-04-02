import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";

export interface UseApproveSignerRequestParams {
    id: string;
    signerAccountId: string;
}

export default function useApproveSignerRequest() {
    const { serviceInstance } = useServiceInstance();

    return useMutation(async (id: string) =>
        SignerRequestService.approveSignerRequest(id, { signerAccountId: serviceInstance.getAddress(), txHash: [] }),
    );
}
