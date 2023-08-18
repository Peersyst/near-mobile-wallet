import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";

interface UseSignMessageParams {
    id: string;
    message: string;
    receiver: string;
}

export default function useSignMessage() {
    const { serviceInstance } = useServiceInstance();

    return useMutation(({ id, message, receiver }: UseSignMessageParams) =>
        SignerRequestService.signMessageRequest(id, {
            publicKey: serviceInstance.getPublicKey(),
            signature: serviceInstance.signMessage(message, receiver),
            accountId: serviceInstance.getAddress(),
        }),
    );
}
