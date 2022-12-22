export const MINIMUM_UNSTAKED = 100;
export const BASE_NEAR_DECIMALS = 5;
//Smart contracts methods
//Staking acctions
export const DEPOSIT_STAKE_METHOD = "deposit_and_stake";
export const UNSTAKE_METHOD = "unstake";
export const UNSTAKE_ALL_METHOD = "unstake_all";
export const WITHDRAW_METHOD = "withdraw";
export const WITHDRAW_ALL_METHOD = "withdraw_all";
//Staking view methods
export const ACCOUNT_TOTAL_BALANCE_METHOD = "get_account_total_balance";
export const ACCOUNT_STAKED_BALANCE_METHOD = "get_account_staked_balance";
export const ACCOUNT_UNSTAKED_BALANCE_METHOD = "get_account_unstaked_balance";
export const IS_ACCOUNT_UNSTAKED_BALANCE_AVAILABLE_METHOD = "is_account_unstaked_balance_available";
export const REWARD_FEE_FRACTION_METHOD = "get_reward_fee_fraction";
//Nft
export const NFT_TRANSFER_GAS = "30000000000000";
export const NFT_TRANSFER_METHOD = "nft_transfer";
export const NFT_METADATA_METHOD = "nft_metadata";
export const NFT_TOKEN_METHOD = "nft_token";
export const NFT_TOKEN_METADATA_METHOD = "nft_token_metadata";
export const NFT_SUPPLY_METHOD = "nft_supply_for_owner";
export const NFT_OWNER_TOKENS_METHOD = "nft_tokens_for_owner";
export const NFT_OWNER_TOKENS_SET_METHOD = "nft_tokens_for_owner_set";
//Fungible token
export const FT_TRANSFER_METHOD = "ft_transfer";
export const FT_METADATA_METHOD = "ft_metadata";
export const FT_BALANCE_METHOD = "ft_balance_of";
//Storage
export const STORAGE_BALANCE_METHOD = "storage_balance_of";
export const STORAGE_DEPOSIT_METHOD = "storage_deposit";
export const TOKEN_TRANSFER_DEPOSIT = "1";
export const FT_TRANSFER_GAS = "15000000000000";
export const FT_STORAGE_DEPOSIT_GAS = "30000000000000";
export const FT_MINIMUM_STORAGE_BALANCE = "1250000000000000000000";
export const FT_MINIMUM_STORAGE_BALANCE_LARGE = "12500000000000000000000";
