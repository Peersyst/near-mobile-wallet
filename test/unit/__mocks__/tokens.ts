import { tokensList } from "module/token/mock/token";
import { TokenAmount } from "module/token/types";

export const token: TokenAmount = {
    type: {
        name: "Wrapped BTC",
        description: "ForceBridge from BSC",
        tokenName: "BTC|bsc",
        imageUri: "https://bitcoin.org/img/icons/opengraph.png?1644775669",
        args: "0x9ea7beb4a36469e00bb30dbac75e93672441b483d519556ba9d1424b9294eae5",
        codeHash: "0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5",
        hashType: "type",
    },
    amount: 20,
};

export const tokens: TokenAmount[] = [...Array(5)].map((_, i) => ({
    type: {
        args: "0x" + (i + 1),
        codeHash: i.toString(),
        hashType: i.toString(),
        imageUri: tokensList[i].imageUri,
        tokenName: tokensList[i].tokenName,
        name: tokensList[i].name,
        description: tokensList[i].description
    },
    amount: Number((Math.random() * 1234.56).toFixed(2)),
}));
