import { ViewStyle } from "react-native";
import { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";

export interface BlockchainAddressCardProps extends Omit<BlockchainAddressProps, "style" | "variant" | "type"> {
    style?: ViewStyle;
    variant?: BlockchainAddressProps["variant"];
    type?: BlockchainAddressProps["type"];
}
