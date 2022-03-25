export interface TokenSDKType {
    args: string;
    codeHash: string;
    hashType: string;
}

export interface TokenType extends TokenSDKType {
    imageUri: string;
    tokenName: string;
    name: string;
    description: string;
}

export type TokenListType = Pick<TokenType, "name" | "description" | "tokenName" | "imageUri" | "args">;

export interface TokenAmount {
    type: TokenType;
    amount: number;
}
