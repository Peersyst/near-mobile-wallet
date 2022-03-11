import { TokenAmount } from "module/token/types";

export const token: TokenAmount = {
    type: {
        args: "mockedArgs",
        codeHash: "a356wegsdgsdfgdsfgdsfgdf",
        hashType: "sha256",
        tokenUri: "https://www.nervos.org/wp-content/uploads/2020/12/Group-22.jpg",
        tokenName: "SUDT"
    },
    amount: 234540.02
}

export const tokens: TokenAmount[] = [...Array(21)].map((_, i) => ({
    type: {
        args: "mockedArgs2",
        codeHash: "cs" + i + "asad",
        hashType: "sha256",
        tokenUri: "https://www.nervos.org/wp-content/uploads/2020/12/Group-22.jpg",
        tokenName: "SUDT"
    },
    amount: i * 10.5,
}));