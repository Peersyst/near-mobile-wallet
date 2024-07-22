export enum DAppTag {
    DEX = "dex",
    BRIDGE = "bridge",
    LIQUID_STAKING = "liquidStaking",
    LEARNING = "learning",
    SOCIAL = "social",
    LENDING = "lending",
    NFT_MARKETPLACE = "nftMarketplace",
    EXPLORER = "explorer",
}

export interface DApp {
    name: string;
    description: string;
    url: string;
    logoUrl: string;
    tag: DAppTag;
    /* Smart contract account id */
    contractId: string;
}
