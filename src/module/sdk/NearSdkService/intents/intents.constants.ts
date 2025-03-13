import { IntentsToken } from "./intents.types";

export const INTENTS_TOKEN_LIST: IntentsToken[] = [
    {
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin",
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.omft.near",
                address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                chain: "eth",
            },
            {
                defuseAssetId: "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                address: "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                chain: "near",
            },
            {
                defuseAssetId: "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                address: "0x368ebb46aca6b8d0787c96b2b20bd3cc3f2c45f7",
                chain: "turbochain",
            },
            {
                defuseAssetId: "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                address: "0x368ebb46aca6b8d0787c96b2b20bd3cc3f2c45f7",
                chain: "aurora",
            },
            {
                defuseAssetId: "nep141:base-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913.omft.near",
                address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                chain: "base",
            },
            {
                defuseAssetId: "nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
                address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
                chain: "arbitrum",
            },
            {
                defuseAssetId: "nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near",
                address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                chain: "solana",
            },
            {
                defuseAssetId: "nep141:gnosis-0x2a22f9c3b484c3629090feed35f17ff8f88f76f0.omft.near",
                address: "0x2a22f9c3b484c3629090feed35f17ff8f88f76f0",
                chain: "gnosis",
            },
        ],
    },
    {
        decimals: 6,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/35336.png",
        symbol: "TRUMP",
        name: "OFFICIAL TRUMP",
        groupedTokens: [
            {
                defuseAssetId: "nep141:sol-c58e6539c2f2e097c251f8edf11f9c03e581f8d4.omft.near",
                address: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
                chain: "solana",
            },
        ],
    },
    {
        decimals: 6,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/35347.png",
        symbol: "MELANIA",
        name: "Official Melania Meme",
        groupedTokens: [
            {
                defuseAssetId: "nep141:sol-d600e625449a4d9380eaf5e3265e54c90d34e260.omft.near",
                address: "FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P",
                chain: "solana",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/24647.png",
        symbol: "BERA",
        name: "BERA",
        groupedTokens: [
            {
                defuseAssetId: "nep141:bera.omft.near",
                address: "native",
                chain: "berachain",
            },
        ],
    },
    {
        decimals: 8,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1437.png",
        symbol: "ZEC",
        name: "Zcash",
        groupedTokens: [
            {
                defuseAssetId: "nep141:zec.omft.near",
                chain: "zcash",
                address: "native",
            },
        ],
    },
    {
        decimals: 24,
        symbol: "NEAR",
        name: "Near",
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/6535.png",
        groupedTokens: [
            {
                defuseAssetId: "nep141:wrap.near",
                address: "wrap.near",
                chain: "near",
            },
            {
                defuseAssetId: "nep141:wrap.near",
                address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
                chain: "turbochain",
            },
            {
                defuseAssetId: "nep141:wrap.near",
                address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
                chain: "aurora",
            },
        ],
    },
    {
        decimals: 6,
        symbol: "USDT",
        name: "Tether USD",
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/825.png",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0xdac17f958d2ee523a2206206994597c13d831ec7.omft.near",
                address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                chain: "eth",
            },
            {
                defuseAssetId: "nep141:usdt.tether-token.near",
                address: "usdt.tether-token.near",
                chain: "near",
            },
            {
                defuseAssetId: "nep141:usdt.tether-token.near",
                address: "0x80Da25Da4D783E57d2FCdA0436873A193a4BEccF",
                chain: "turbochain",
            },
            {
                defuseAssetId: "nep141:usdt.tether-token.near",
                address: "0x80Da25Da4D783E57d2FCdA0436873A193a4BEccF",
                chain: "aurora",
            },
            {
                defuseAssetId: "nep141:arb-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.omft.near",
                address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
                chain: "arbitrum",
            },
            {
                defuseAssetId: "nep141:sol-c800a4bd850783ccb82c2b2c7e84175443606352.omft.near",
                address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
                chain: "solana",
            },
        ],
    },
    {
        decimals: 18,
        symbol: "ETH",
        name: "ETH",
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth.omft.near",
                address: "native",
                chain: "eth",
            },
            {
                defuseAssetId: "nep141:aurora",
                address: "aurora",
                chain: "near",
            },
            {
                defuseAssetId: "nep141:aurora",
                address: "0x5a524251df27A25AC6b9964a93E1c23AD692688D",
                chain: "turbochain",
            },
            {
                defuseAssetId: "nep141:aurora",
                address: "native",
                chain: "aurora",
            },
            {
                defuseAssetId: "nep141:base.omft.near",
                address: "native",
                chain: "base",
            },
            {
                defuseAssetId: "nep141:arb.omft.near",
                address: "native",
                chain: "arbitrum",
            },
            {
                defuseAssetId: "nep141:gnosis-0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1.omft.near",
                address: "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1",
                chain: "gnosis",
            },
        ],
    },
    {
        decimals: 18,
        symbol: "AURORA",
        name: "Aurora",
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/14803.png",
        groupedTokens: [
            {
                defuseAssetId: "nep141:aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
                address: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
                chain: "near",
            },
            {
                defuseAssetId: "nep141:aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
                address: "0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79",
                chain: "turbochain",
            },
            {
                defuseAssetId: "nep141:aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
                address: "0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79",
                chain: "aurora",
            },
            {
                defuseAssetId: "nep141:eth-0xaaaaaa20d9e0e2461697782ef11675f668207961.omft.near",
                address: "0xAaAAAA20D9E0e2461697782ef11675f668207961",
                chain: "eth",
            },
        ],
    },
    {
        decimals: 8,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png",
        symbol: "BTC",
        name: "Bitcoin",
        groupedTokens: [
            {
                defuseAssetId: "nep141:btc.omft.near",
                chain: "bitcoin",
                address: "native",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/24478.png",
        symbol: "PEPE",
        name: "Pepe",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0x6982508145454ce325ddbe47a25d4ec3d2311933.omft.near",
                address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
                chain: "eth",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/5994.png",
        symbol: "SHIB",
        name: "Shiba Inu",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.omft.near",
                address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
                chain: "eth",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1975.png",
        symbol: "LINK",
        name: "Chainlink",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0x514910771af9ca656af840dff83e8264ecf986ca.omft.near",
                address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
                chain: "eth",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/7083.png",
        symbol: "UNI",
        name: "Uniswap",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.omft.near",
                address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
                chain: "eth",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/11841.png",
        symbol: "ARB",
        name: "Arbitrum",
        groupedTokens: [
            {
                defuseAssetId: "nep141:arb-0x912ce59144191c1204e64559fe8253a0e49e6548.omft.near",
                address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
                chain: "arbitrum",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/7278.png",
        symbol: "AAVE",
        name: "Aave",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.omft.near",
                address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
                chain: "eth",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/11857.png",
        symbol: "GMX",
        name: "GMX",
        groupedTokens: [
            {
                defuseAssetId: "nep141:arb-0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a.omft.near",
                address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
                chain: "arbitrum",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/27659.png",
        symbol: "MOG",
        name: "Mog Coin",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0xaaee1a9723aadb7afa2810263653a34ba2c21c7a.omft.near",
                address: "0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a",
                chain: "eth",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/29743.png",
        symbol: "BRETT",
        name: "Brett",
        groupedTokens: [
            {
                defuseAssetId: "nep141:base-0x532f27101965dd16442e59d40670faf5ebb142e4.omft.near",
                address: "0x532f27101965dd16442E59d40670FaF5eBB142E4",
                chain: "base",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/21351.png",
        symbol: "SWEAT",
        name: "Sweat Economy",
        groupedTokens: [
            {
                defuseAssetId: "nep141:token.sweat",
                address: "token.sweat",
                chain: "near",
            },
        ],
    },

    {
        decimals: 9,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/5426.png",
        symbol: "SOL",
        name: "Solana",
        groupedTokens: [
            {
                defuseAssetId: "nep141:sol.omft.near",
                address: "native",
                chain: "solana",
            },
        ],
    },
    {
        decimals: 8,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/74.png",
        symbol: "DOGE",
        name: "Dogecoin",
        groupedTokens: [
            {
                defuseAssetId: "nep141:doge.omft.near",
                address: "native",
                chain: "dogecoin",
            },
        ],
    },
    {
        decimals: 18,
        symbol: "TURBO",
        name: "Turbo",
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/24911.png",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0xa35923162c49cf95e6bf26623385eb431ad920d3.omft.near",
                address: "0xA35923162C49cF95e6BF26623385eb431ad920D3",
                chain: "eth",
            },
            {
                defuseAssetId: "nep141:a35923162c49cf95e6bf26623385eb431ad920d3.factory.bridge.near",
                address: "native",
                chain: "turbochain",
            },
            {
                defuseAssetId: "nep141:a35923162c49cf95e6bf26623385eb431ad920d3.factory.bridge.near",
                address: "a35923162c49cf95e6bf26623385eb431ad920d3.factory.bridge.near",
                chain: "near",
            },
            {
                defuseAssetId: "nep141:sol-df27d7abcc1c656d4ac3b1399bbfbba1994e6d8c.omft.near",
                address: "2Dyzu65QA9zdX1UeE7Gx71k7fiwyUK6sZdrvJ7auq5wm",
                chain: "solana",
            },
        ],
    },
    {
        decimals: 6,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/52.png",
        symbol: "XRP",
        name: "XRP",
        groupedTokens: [
            {
                defuseAssetId: "nep141:xrp.omft.near",
                address: "native",
                chain: "xrpledger",
            },
        ],
    },
    {
        decimals: 6,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/28752.png",
        symbol: "WIF",
        name: "dogwifhat",
        groupedTokens: [
            {
                defuseAssetId: "nep141:sol-b9c68f94ec8fd160137af8cdfe5e61cd68e2afba.omft.near",
                address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
                chain: "solana",
            },
        ],
    },
    {
        decimals: 6,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/29870.png",
        symbol: "BOME",
        name: "BOOK OF MEME",
        groupedTokens: [
            {
                defuseAssetId: "nep141:sol-57d087fd8c460f612f8701f5499ad8b2eec5ab68.omft.near",
                address: "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82",
                chain: "solana",
            },
        ],
    },
    {
        decimals: 24,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/29627.png",
        symbol: "BLACKDRAGON",
        name: "Black Dragon",
        groupedTokens: [
            {
                defuseAssetId: "nep141:blackdragon.tkn.near",
                address: "blackdragon.tkn.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/19354.png",
        symbol: "SHITZU",
        name: "Shitzu",
        groupedTokens: [
            {
                defuseAssetId: "nep141:token.0xshitzu.near",
                address: "token.0xshitzu.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 18,
        icon: "data:image/png;base64,UklGRrIDAABXRUJQVlA4IKYDAAAwGACdASpgAGAAP7G6zmc8ryknvH94A5A2CWoAzkCCqaGFPaS9yv83xxkQvw+Konsv/3wkCUUQ1Oq2Qz9qOOkUY1hDSymYmVqiZagBtpTgBjSXnvmiIWVEkKtAewltk9gBFQ6x5KBAnSChG+08xYO4vyI2YizvPlNVV2Z5ypjEyb8YWAHmL/fHe4LBHR7y8u6lcrQ9v7tj92poQcgjyrtb8Ejwv0VtC51uD3geQjzhIi2RVOM2qzWb+DyZ6RPRrMkJKdLFKUDPMJNAAPJv5vhOy7BgcCIMMJ1XglA8W3PstAv/VFDmqQSf03x6lmEw7drRJkAkEZS1o1Zxi7vuxWme5dlaFsep8L93ni75ZuC1ac5zBIXVzqkwXj1Y5rAah85aVfbUVN0ZSqv5RroDzs1MpiZ33/eqXG+udld11eDn4vxkjCDziWOa0JwTTpXYpwRGIFwGCwka81dIvk1w8SM7BbS0ad83FcM32tBX9CfS1CIu3xkT8UFENC9BpdZiosh6aLBBNFZJRAEcFBF9cuV2vMxzzmDEDm8nzZ76nyZSVgD+r2CP6DwWqABDqUwX48V2tpjvD7BgGSwsCjKCTTzYdBuWTXOMwz53jD2M6kN6bUr4e6ICJgv4GygYwCTs4lWdn5LXyMaDEQiUGn2V3T/KTMlzGpd9sRQyguh6RuYArudcezBDrN8lbmTrFFe2eGR7qEdySQn/lJg5Z5gkphPICr1KkZSepuAeF21pT5jAcB6MS/0KU7N/ahGT3od/0TGzW+0GGpoVWmbaxupLdGFAHfHhvrLl8T3XyuxUkl8mkFv6JFvPVwomr4yv0GVgg7CcOxBHhJKMbRl7VqWORgeyfEzPpSiv87l6326/Txg/emIFICrtnOcXcr46GBT/jNdDgdlsMOHD6QiArvwtrUrcJTyv3gzyrO4MfSuwJTgeTYSDud8rH+Fyh2qDhKumJjVcI3kS5r1tTMi/9XF8y1uFGYLPkG/Ra/eYEGug5YFR+9hIlnHTmusGOyPdhCSnO4eXz3hDtGLTIpaqhaMmhopxRNdneBhSnPSIGgL1r4B1jG760bJqMCCcNNNNl6Hh6cuNQaoGnwlZ6vsXe26i89ALMz4TZk/R6MvVbGAP/6tdGIPdB7WQa8bBg3/CxmnfKnMGwjbk/iXNOSsmjGYkKWEmsY9RIrKaGTAibzrCnC32H3Y9HedSxq67ACnzFPVEbKP2O/2Z5p4S+ro6rLuHAdETfSIGcAAA",
        symbol: "PURGE",
        name: "Forgive Me Father",
        groupedTokens: [
            {
                defuseAssetId: "nep141:purge-558.meme-cooking.near",
                address: "purge-558.meme-cooking.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/20604.png",
        symbol: "BRRR",
        name: "Burrow",
        groupedTokens: [
            {
                defuseAssetId: "nep141:token.burrow.near",
                address: "token.burrow.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 18,
        icon: "data:image/png;base64,UklGRvQAAABXRUJQVlA4IOgAAADQCgCdASpgAGAAP9Hg622/tjKqKdRqO/A6CWcA1Er9hfpalM0KjtQ3QolBZ0DnFkdZsShp72kk1LVeIHWCpNrbxil8dJpNCM9b1CZa4mOf7XgxcsJKQUYldLsGu2kW8AD+59NNqUjGXZSNo958Qn3F8SUFLm4pjEffyYQfmDlTwNDx2xo5ikBuCess5ZsoPg8R5Ah37d1DNsfg8BvWhgVSLFDX+dLKBbuT9bzxz5Z4nil4PnUAbh5Iasayl/ia08ZjHQj0KhYntw4l4TrPWkp0njlSWPg2xwoZ564qYl13AGAjvunKR5AA",
        symbol: "ABG",
        name: "Asian Girl Boss",
        groupedTokens: [{ defuseAssetId: "nep141:abg-966.meme-cooking.near", address: "abg-966.meme-cooking.near", chain: "near" }],
    },
    {
        decimals: 18,
        icon: "data:image/png;base64,UklGRngCAABXRUJQVlA4IGwCAABQEgCdASpgAGAAP83U22c/tCunsPycO/A5iWwAyRGrVKi/U7KnSqpEPDSRCDGcwAaoinEHq7dsJf0zolbSY81ZE7ONfKGLcStEMwiyGADz9rGhOo+63MUC/qPniOnANlHdRKDsejjCqUj0Up7z3zrQkfDbrgtTSW236t7K1sYpqNzqwWJRv3VW+1RDAagReGZSzxMHNfFqucIhoAD+6SiwWMdyfpdWWgixevAFIGXl/gL15AHcPU1/6t9inv65LQ1Q3X/Fr2+i1AyW6NmIlu1ZdBdg2YRRQscvLMBkj43Is/Xl8BthEhMn3i7bg9YekHrVGvVY0NxDRpAXz0JyK18tuaXRLp/pcjWxWz9We1fh6HXhC95EPRdSTjQWu+5SaraUI52YC9GQY9en1LpE4YcuVDL3rR3FSnr/0uS5pWdszjhuCciOFRuD0tNSnhLTbvCscTDUqlkc30f0jqN25O+JsFwloOsJRp2P60J/KUundPUzKUP2G7GxaOwUVlq/v5oSRxmZlVG6ZVy3043WHjTfnAlBPcTxREaQsTOjcg4S25EgudiBhWr3GYmttx0CKru7Lsfn80PhyqgWgEbIvLZjBftaj7wb9UodqeJ47OCM/DFrPR3/t2JAv7H+dIIvwKbUI/YSTiMg4V7rb9hNPZ06OZskoWd5RbYj7y16zqS3U8/O2DRclC5tdT66/iE6xofHOwAlNZP2wi5XdtmWUA6zV/qsS99+jAvNu2G4/u0dRGD3RU5mvY06KqOeoWEuaSrgEjn266CEWhJwNRrIqmovWEgYZn+7HSzyGzGeo94ZolZ/IDIuZ+fE8I0AAA==",
        symbol: "NOEAR",
        name: "NOEAR",
        groupedTokens: [
            {
                defuseAssetId: "nep141:noear-324.meme-cooking.near",
                address: "noear-324.meme-cooking.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://peersyst-public-production.s3.eu-west-1.amazonaws.com/922a4ac7-6b4d-4e6c-a47a-44fbd01a069a.png",
        symbol: "REF",
        name: "Ref Finance",
        groupedTokens: [
            {
                defuseAssetId: "nep141:token.v2.ref-finance.near",
                address: "token.v2.ref-finance.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 6,
        icon: "https://peersyst-public-production.s3.eu-west-1.amazonaws.com/6369a826-b1c5-4936-8dda-52b271632fa3.png",
        symbol: "mpDAO",
        name: "Meta DAO Governance Token",
        groupedTokens: [
            {
                defuseAssetId: "nep141:mpdao-token.near",
                address: "mpdao-token.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://peersyst-public-production.s3.eu-west-1.amazonaws.com/79832af6-e8d1-4215-8452-d1f658e1bee5.png",
        symbol: "GNEAR",
        name: "gnear",
        groupedTokens: [
            {
                defuseAssetId: "nep141:gnear-229.meme-cooking.near",
                address: "gnear-229.meme-cooking.near",
                chain: "near",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/4943.png",
        symbol: "DAI",
        name: "Dai",
        groupedTokens: [
            {
                defuseAssetId: "nep141:eth-0x6b175474e89094c44da98b954eedeac495271d0f.omft.near",
                address: "0x6b175474e89094c44da98b954eedeac495271d0f",
                chain: "eth",
            },
            {
                defuseAssetId: "nep141:gnosis.omft.near",
                address: "native",
                chain: "gnosis",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1659.png",
        symbol: "GNO",
        name: "Gnosis",
        groupedTokens: [
            {
                defuseAssetId: "nep141:gnosis-0x9c58bacc331c9aa871afd802db6379a98e80cedb.omft.near",
                address: "0x9c58bacc331c9aa871afd802db6379a98e80cedb",
                chain: "gnosis",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/19269.png",
        symbol: "COW",
        name: "CoW Protocol",
        groupedTokens: [
            {
                defuseAssetId: "nep141:gnosis-0x177127622c4a00f3d409b75571e12cb3c8973d3c.omft.near",
                address: "0x177127622c4a00f3d409b75571e12cb3c8973d3c",
                chain: "gnosis",
            },
        ],
    },
    {
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/21585.png",
        symbol: "SAFE",
        name: "Safe",
        groupedTokens: [
            {
                defuseAssetId: "nep141:gnosis-0x4d18815d14fe5c3304e87b3fa18318baa5c23820.omft.near",
                address: "0x4d18815d14fe5c3304e87b3fa18318baa5c23820",
                chain: "gnosis",
            },
        ],
    },
];
