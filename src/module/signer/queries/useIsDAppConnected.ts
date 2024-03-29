import { config } from "config";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useQuery } from "react-query";

export default function useIsDAppConnected(contractId: string) {
    const { serviceInstance, index, network } = useServiceInstance();

    return useQuery([Queries.IS_DAPP_CONNECTED, index, network, contractId], () => serviceInstance.isAccountConnected(contractId), {
        enabled: !!serviceInstance && config.signerFeature.enabled,
    });
}
