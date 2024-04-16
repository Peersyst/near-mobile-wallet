import BlockchainAddress, { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";

export interface AccountProps extends Omit<BlockchainAddressProps, "type"> {}

const Account = ({ ...rest }: AccountProps) => {
    return <BlockchainAddress {...rest} type="address" />;
};

export default Account;
