import { config } from "config";
import useIsMainnet from "module/settings/hook/useIsMainnet";

export default function useGetSwapLink(): string {
    const isMainnet = useIsMainnet();
    return isMainnet ? config.mainnetSwapUrl : config.testnetSwapUrl;
}
