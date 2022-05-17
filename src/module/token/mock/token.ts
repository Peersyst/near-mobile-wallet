import { TokenAmount, TokenType } from "module/token/types";

export const tokensList: TokenType[] = [
    {
        name: "Wrapped USDC",
        description: "ForceBridge from Ethereum",
        tokenName: "USDC|eth",
        imageUri: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
        args: "0x5c4ac961a2428137f27271cf2af205e5c55156d26d9ac285ed3170e8c4cc1501",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
        apiId: "usd-coin",
    },
    {
        name: "Wrapped BNB",
        description: "ForceBridge from BSC",
        tokenName: "BNB|bsc",
        imageUri: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png",
        args: "0x578cd6ab8c0800e6fbc17b58633857dac5626883af89f842e79cb8f7af24de75",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
        apiId: "binancecoin",
    },
    {
        name: "Wrapped ETH",
        description: "ForceBridge from Ethereum",
        tokenName: "ETH|eth",
        imageUri:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png/640px-ETHEREUM-YOUTUBE-PROFILE-PIC.png",
        args: "0x9657b32fcdc463e13ec9205914fd91c443822a949937ae94add9869e7f2e1de8",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
        apiId: "ethereum",
    },
    {
        name: "Wrapped USDC",
        description: "ForceBridge from BSC",
        tokenName: "USDC|bsc",
        imageUri: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
        args: "0xcedd0f67f2d218ab992284ab343c2e729d2a124a1612592deaa9f8b8f8a581dd",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
        apiId: "usd-coin",
    },
    {
        name: "USDT",
        description: "Bridged",
        tokenName: "CUSDT",
        imageUri:
            "data:image/png;base64,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",
        args: "0xf951c4f35aabb9b23dff18b1c7e433801ff6d94430d180335082cc65373d1220",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
        apiId: "tether",
    },
    {
        name: "Wrapped BTC",
        description: "ForceBridge from BSC",
        tokenName: "BTC|bsc",
        imageUri: "https://bitcoin.org/img/icons/opengraph.png?1644775669",
        args: "0x9ea7beb4a36469e00bb30dbac75e93672441b483d519556ba9d1424b9294eae5",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
        apiId: "wrapped-bitcoin",
    },
];

export const tokenAmountZeroBalanceList: TokenAmount[] = tokensList.map((_, i) => ({
    type: tokensList[i],
    amount: 0,
}));

export const UknownToken: TokenType = {
    name: "Unknown Token",
    tokenName: "Unknown Token",
    description: "Unknown Token",
    imageUri: "",
    args: "",
    codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
    hashType: "type",
    apiId: "usd-coin",
};

export const Token: TokenAmount = {
    type: {
        name: "Wrapped BTC",
        description: "ForceBridge from BSC",
        tokenName: "BTC|bsc",
        imageUri: "https://bitcoin.org/img/icons/opengraph.png?1644775669",
        args: "0x9ea7beb4a36469e00bb30dbac75e93672441b483d519556ba9d1424b9294eae5",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
        apiId: "wrapped-bitcoin",
    },
    amount: 20000.02,
};

export const tokens: TokenAmount[] = [...Array(5)].map((_, i) => ({
    type: tokensList[i],
    amount: Number((Math.random() * 1234.56).toFixed(2)),
}));
