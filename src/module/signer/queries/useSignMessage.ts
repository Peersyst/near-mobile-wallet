import { SignerRequestService } from "module/api/service";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useMutation } from "react-query";

interface UseSignMessageParams {
    id: string;
    message: string;
    receiver: string;
    nonce: Buffer;
    callbackUrl?: string;
}

export default function useSignMessage(walletIndex?: number) {
    const { serviceInstance } = useServiceInstance(walletIndex);

    return useMutation(async ({ id, message, receiver, nonce, callbackUrl }: UseSignMessageParams) => {
        const signedPayload = await serviceInstance.signMessage(message, receiver, nonce, callbackUrl);
        await SignerRequestService.signMessageRequest(id, signedPayload);
    });
}
