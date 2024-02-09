import { Token as TokenSDKType } from "near-peersyst-sdk";

export type ApiIdType = "usd-coin" | "binancecoin" | "ethereum" | "tether" | "wrapped-bitcoin" | "nervos-network";

export interface TokenType extends Omit<TokenSDKType, "metadata" | "balance"> {
    imageUri: string;
    tokenName: string;
    name: string;
    description: string;
    decimals: number;
    apiId: ApiIdType;
    args: string;
    codeHash: string;
    hashType: string;
}

export interface TokenAmount {
    type: TokenType;
    amount: number;
}
