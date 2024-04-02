export interface FastNearAccountsFromPublicKeyResponseDto {
    public_key: string;
    account_ids: string[];
}

export interface FastNearStakingPoolDto {
    last_update_block_height: number;
    pool_id: string;
}

export interface FastNearStakingPoolsFromAccountIdResponseDto {
    account_id: string;
    pools: FastNearStakingPoolDto[];
}

export interface FastNearFTDataFromAccountDto {
    balance: string;
    contract_id: string;
    last_update_block_height: string;
}

export interface FastNearFTFromAccountIdResponseDto {
    account_id: string;
    contracts_ids: FastNearFTDataFromAccountDto[];
}

export interface FastNearNFTDataFromAccountDto {
    contract_id: string;
    last_update_block_height: string;
}

export interface FastNearNFTFromAccountIdResponseDto {
    account_id: string;
    contracts_ids: FastNearNFTDataFromAccountDto[];
}
