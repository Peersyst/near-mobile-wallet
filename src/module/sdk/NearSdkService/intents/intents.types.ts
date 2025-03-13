export interface IntentsTokenChainInfo {
    /**
     * Blockchain name (e.g., eth, near, sol)
     */
    chain: string;
    /**
     * Token contract address on the given chain
     */
    defuseAssetId: string;
    /**
     * The address of the token contract on the chain
     */
    address: string | "native";
}

export interface IntentsToken {
    /**
     *  Token decimals for conversion
     */
    decimals: number;
    /**
     * Token logo/icon URL
     */
    icon: string;
    /**
     * Token symbol (e.g., USDC, NEAR)
     */
    symbol: string;
    /**
     * Token name (e.g., "USD Coin")
     */
    name: string;
    /**
     * List of balances across different chains in Defuse/Intents
     */
    groupedTokens: IntentsTokenChainInfo[];
}

export interface IntentsChainTokenBalance extends IntentsTokenChainInfo {
    /**
     * Transit balance of the token
     */
    transitBalance: string;
    /**
     * Deposited balance of the token
     */
    depositedBalance: string;
    /**
     * Total balance of the token
     */
    totalBalance: string;
}

export interface IntentsTokenBalance extends IntentsToken {
    /**
     * List of balances across different chains in Defuse/Intents
     */
    chainBalances: IntentsChainTokenBalance[];
    /**
     * Total balance of the token
     */
    totalBalance: string;
    /**
     * Total deposited balance of the token
     */
    totalDepositedBalance: string;
    /**
     * Total transit balance of the token
     */
    totalTransitBalance: string;
}
