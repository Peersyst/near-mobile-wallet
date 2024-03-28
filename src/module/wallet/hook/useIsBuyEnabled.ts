import { useConfig } from "@peersyst/react-native-components";
import useIsMainnet from "module/settings/hook/useIsMainnet";

export default function useIsBuyEnabled(): boolean {
    const enableBuy = useConfig("enableBuy");
    const isMainnet = useIsMainnet();
    return enableBuy && isMainnet;
}
