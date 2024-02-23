import { Chains } from "module/common/types";
import useSelectedNetwork from "./useSelectedNetwork";

export default function (): boolean {
    const network = useSelectedNetwork();
    return network === Chains.MAINNET;
}
