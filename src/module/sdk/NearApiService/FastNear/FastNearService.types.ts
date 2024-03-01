export interface FastNearAccountsFromPublicKeyResponseDto {
    public_key: string;
    account_ids: string[];
}

export interface FastNearStakingPoolsFromAccountIdResponseDto {
    account_id: string;
    staking_pools: string[];
}

export interface FastNearFTFromAccountIdResponseDto {
    account_id: string;
    contracts_ids: string[];
}

export interface FastNearNFTFromAccountIdResponseDto {
    account_id: string;
    contracts_ids: string[];
}
