import {
    BlockchainAddress as BaseBlockchainAddress,
    BlockchainAddressProps as BaseBlockchainAddressProps,
} from "@peersyst/react-native-components";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

export type BlockchainAddressType = "address" | "tx";

export interface BlockchainAddressProps extends Omit<BaseBlockchainAddressProps, "type"> {
    type: BlockchainAddressType;
}

const BlockchainAddress = ({ type: typeProp, ...rest }: BlockchainAddressProps): JSX.Element => {
    const network = useSelectedNetwork();

    const type = ((): BaseBlockchainAddressProps["type"] => {
        if (network === "testnet") return typeProp === "address" ? "testnetAddress" : "testnetTx";
        else return typeProp === "address" ? "mainnetAddress" : "mainnetTx";
    })();

    return <BaseBlockchainAddress type={type} ellipsizeMode="middle" {...rest} />;
};

export default BlockchainAddress;
