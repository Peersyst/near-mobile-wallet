import { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";

export type UseExplorerButtonParams = Pick<BlockchainAddressProps, "address" | "type">;

export type UseExplorerButtonReturn = {
    url: string;
};
