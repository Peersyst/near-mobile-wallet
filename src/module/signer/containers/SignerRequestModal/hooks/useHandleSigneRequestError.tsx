import { SignerRequestDto } from "module/api/service";
import { useTranslate } from "module/common/hook/useTranslate";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Error from "module/common/component/display/Error/Error";

interface SignerRequestError {
    title: string;
    description: string;
    condition: boolean;
}

interface useHandleSignerRequestErrorReturn {
    signerRequestError: JSX.Element | undefined;
    isSignerRequestError: boolean;
}

export default function useHandleSignerRequestError(signerRequest: SignerRequestDto | undefined): useHandleSignerRequestErrorReturn {
    const translateError = useTranslate("error");
    const { serviceInstance } = useServiceInstance();
    const network = useSelectedNetwork();

    const matchingNetwork = network === signerRequest?.network;

    const address = serviceInstance?.getAddress();
    const isValidSigner = signerRequest?.requests[0].signerId === address || signerRequest?.requests[0].signerId === undefined;

    const errors: SignerRequestError[] = [
        {
            title: translateError("networkMismatch"),
            description: translateError("networkMismatchDescription"),
            condition: !matchingNetwork,
        },
        {
            title: translateError("invalidSigner"),
            description: translateError("invalidSignerDescription"),
            condition: !isValidSigner,
        },
    ];

    const isError = errors.find((error) => error.condition);

    return {
        signerRequestError: isError ? <Error title={isError?.title} description={isError?.description} /> : undefined,
        isSignerRequestError: !!isError,
    };
}
