import { IntentsToken } from "../intents.types";

/**
 * Get all token ids from the token list.
 * @param tokenList Token list.
 * @returns A string containing all near accounts of all tokens in the list.
 */
export function extractTokenIds(tokenList: IntentsToken[]): string[] {
    const tokenSet = new Set<string>();

    tokenList.forEach((token) => {
        token.groupedTokens.forEach((groupedToken) => {
            tokenSet.add(groupedToken.defuseAssetId);
        });
    });

    return Array.from(tokenSet);
}
