import { TokenAmount } from "module/token/types";

export const Token: TokenAmount = {
    type: {
        args: "csvsf",
        codeHash: "cs",
        hashType: "csdc",
        tokenUri: "https://www.nervos.org/wp-content/uploads/2020/12/Group-22.jpg",
        tokenName: "SUDT"
    },
    amount: 20000.02
}

export const tokens: TokenAmount[] = [...Array(21)].map((_, i) => ({
    type: {
        args: "csvsf",
        codeHash: "cs" + i,
        hashType: "sha256",
        tokenUri: "https://www.nervos.org/wp-content/uploads/2020/12/Group-22.jpg",
        tokenName: "SUDT"
    },
    amount: i * 25.5,
}));