import { TokenType as TokenSDKType } from "ckb-peersyst-sdk";

export type ApiIdType = "usd-coin" | "binancecoin" | "ethereum" | "tether" | "wrapped-bitcoin" | "nervos-network";

export interface TokenType extends TokenSDKType {
    imageUri: string;
    tokenName: string;
    name: string;
    description: string;
    apiId: ApiIdType;
}

export interface TokenAmount {
    type: TokenType;
    amount: number;
}
