import { useComponentConfig } from "@peersyst/react-native-components";
import useBlockchainAddressType from "module/common/component/display/BlockchainAddress/useBlockchainAddressType/useBlockchainAddressType";
import { UseExplorerButtonParams, UseExplorerButtonReturn } from "./useExplorerButton.types";

export default function useExplorerButton({ type: addressType, address }: UseExplorerButtonParams): UseExplorerButtonReturn {
    const type = useBlockchainAddressType(addressType);
    const { blockchainLinks } = useComponentConfig("BlockchainAddress");

    const url = blockchainLinks[type] + address;

    return { url };
}
