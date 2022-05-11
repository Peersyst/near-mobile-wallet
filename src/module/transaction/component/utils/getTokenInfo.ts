import { tokensList } from "module/token/mock/token";
import { TokenType } from "module/token/types";

export interface TokenTypeInfo extends TokenType {
    tokenEquivalent: string;
}

export function getTokenInfo(args: string): TokenType {
    const token = tokensList.filter((token) => token.args === args);
    return token.length > 0 ? token[0].tokenName : ("ckb" as any);
}
