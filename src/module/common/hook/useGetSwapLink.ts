import { config } from "config";
import useIsMainnet from "module/settings/hook/useIsMainnet";

export interface GetSwapLinkParams {
    contractId?: string;
}

export default function useGetSwapLink({ contractId = "near" }: GetSwapLinkParams = {}): string {
    const isMainnet = useIsMainnet();
    const swapUrl = isMainnet ? config.mainnetSwapUrl : config.testnetSwapUrl;
    return `${swapUrl}/swap/#${contractId}%7Cnear`;
}
