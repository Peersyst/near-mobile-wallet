import { Chains } from "near-peersyst-sdk";
import useSelectedNetwork from "./useSelectedNetwork";

export default function (): boolean {
    const network = useSelectedNetwork();
    return network === Chains.MAINNET;
}
