import { tokensList } from "module/token/mock/token";
import { TokenAmount } from "module/token/types";

export const newToken = {
    metadata: {
        name: "Bitcoin",
        symbol: "BTC",
        decimals: 8,
        imageUri:
            "https://s3-alpha-sig.figma.com/img/32d6/c448/29fed82fec1d9892f7ee8191c7283e41?Expires=1665964800&Signature=UpMwOiI1dE6o2pIE6PrgeoxV0N6i41c2gE4XyM7hPVJtrsF-4qTCuIew6FywlEZtVjmkEAlkO0QH2S5GRe-aX8zhgwbJZcVxd2Je8DngIQCORc0yW3HH~SEM8ze59uNK40MmYhg78cG209ZCWlb~Jg~5TA8TGhcnvu~vsCWzQMk1fz1G799X9gKKDClSCIVtkgyaedhE9ja5ev3WvL0i91a~RHB~j00Ts79ijxmIO-qXd1zS9IsnzzH6-bJXvPzB7O4AJngWk6dwncJ3KubuJQvB27VK~R4kGM5xHqaxXl76g3SNA5qV~dbuPW6zLkd4qHQzqAtE2uDvPfMj8zrCVQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    balance: BigInt(100),
};

export const token: TokenAmount = {
    type: {
        name: "Wrapped BTC",
        description: "ForceBridge from BSC",
        tokenName: "BTC|bsc",
        decimals: 18,
        imageUri: "https://bitcoin.org/img/icons/opengraph.png?1644775669",
        args: "0x9ea7beb4a36469e00bb30dbac75e93672441b483d519556ba9d1424b9294eae5",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
    },
    amount: 20 * 10 ** 18,
};

export const tokens: TokenAmount[] = [...Array(5)].map((_, i) => ({
    type: {
        args: tokensList[i].args,
        codeHash: tokensList[i].codeHash,
        hashType: tokensList[i].hashType,
        imageUri: tokensList[i].imageUri,
        tokenName: tokensList[i].tokenName,
        name: tokensList[i].name,
        decimals: tokensList[i].decimals,
        description: tokensList[i].description,
    },
    amount: 20,
}));
