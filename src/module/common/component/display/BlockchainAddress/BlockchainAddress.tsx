import {
    BlockchainAddress as BaseBlockchainAddress,
    BlockchainAddressProps as BaseBlockchainAddressProps,
} from "@peersyst/react-native-components";
import useBlockchainAddressType from "./useBlockchainAddressType/useBlockchainAddressType";

export type BlockchainAddressType = "address" | "tx";

export interface BlockchainAddressProps extends Omit<BaseBlockchainAddressProps, "type"> {
    type: BlockchainAddressType;
}

const BlockchainAddress = ({ type: typeProp, ...rest }: BlockchainAddressProps): JSX.Element => {
    const type = useBlockchainAddressType(typeProp);

    return <BaseBlockchainAddress type={type} ellipsizeMode="middle" {...rest} />;
};

export default BlockchainAddress;
