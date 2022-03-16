export interface TokenSDKType {
    args: string;
    codeHash: string;
    hashType: string;
}

export interface TokenType extends TokenSDKType {
    tokenUri: string;
    tokenName: string;
}
export interface TokenAmount {
    type: TokenType;
    amount: number;
}
