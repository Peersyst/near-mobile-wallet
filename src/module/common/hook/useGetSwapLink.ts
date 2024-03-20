import { config } from "config";
import useIsMainnet from "module/settings/hook/useIsMainnet";

export interface GetSwapLinkProps {
    contractId?: string;
}
export default function useGetSwapLink({ contractId = "near" }: GetSwapLinkProps): string {
    const isMainnet = useIsMainnet();
    return isMainnet ? `${config.mainnetSwapUrl}/#${contractId}|near` : `${config.testnetSwapUrl}/#${contractId}|near`;
}
