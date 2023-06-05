import { BlockchainAddressProps } from "@peersyst/react-native-components";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { BlockchainAddressType } from "../BlockchainAddress";

export default function useBlockchainAddressType(typeParam: BlockchainAddressType) {
    const network = useSelectedNetwork();

    const type = ((): BlockchainAddressProps["type"] => {
        if (network === "testnet") return typeParam === "address" ? "testnetAddress" : "testnetTx";
        else return typeParam === "address" ? "mainnetAddress" : "mainnetTx";
    })();

    return type;
}
