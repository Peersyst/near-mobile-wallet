import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { serviceInstancesMap } from "module/wallet/state/ServiceInstances/ServiceInstances";
import useGetSignerRequest from "../queries/useGetSignerRequest";
import { useEffect } from "react";
import useWalletState from "module/wallet/hook/useWalletState";

export default function useSignerRequest(id: string) {
    const { data: signerRequest, ...rest } = useGetSignerRequest(id);

    const network = useSelectedNetwork();
    const { setSelectedWallet } = useWalletState();

    const setSignerWallet = (signerId: string): void => {
        serviceInstancesMap.get(network)?.forEach((serviceInstance, index) => {
            const walletAddress = serviceInstance.getAddress();

            if (walletAddress === signerId) setSelectedWallet(index);
        });
    };

    useEffect(() => {
        if (signerRequest?.requests[0].signerId) setSignerWallet(signerRequest.requests[0].signerId);
    }, [signerRequest]);

    return { signerRequest, ...rest };
}
