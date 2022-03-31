import { tokensList } from "module/token/mock/token"

export function getTokenName(args: string):string {
    const token = tokensList.filter(token => token.args === args)
    return token.length > 0 ? token[0].tokenName : "ckb"
}