import { Action, AddKeyPermission } from "../components/display/SignRequestDetails/actions.types";
import { transactions, utils } from "near-api-js";

export const parseArgs = (data: Object | string) => {
    if (typeof data === "string") return Buffer.from(data, "base64");
    return data;
};

export const getAccessKey = (permission: AddKeyPermission) => {
    if (permission === "FullAccess") {
        return transactions.fullAccessKey();
    }

    const { receiverId, methodNames = [] } = permission;
    const allowance = permission.allowance ? BigInt(permission.allowance) : undefined;
    //TODO: Fix when receiverId is undefined
    //@ts-ignore
    return transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};

export const createAction = (action: Action) => {
    switch (action.type) {
        case "DeployContract": {
            const { code } = action.params;
            return transactions.deployContract(code);
        }

        case "FunctionCall": {
            const { methodName, args, gas, deposit } = action.params;
            return transactions.functionCall(methodName, parseArgs(args), BigInt(gas), BigInt(deposit));
        }

        case "Transfer": {
            const { deposit } = action.params;
            return transactions.transfer(BigInt(deposit));
        }

        case "Stake": {
            const { stake, publicKey } = action.params;
            return transactions.stake(BigInt(stake), utils.PublicKey.from(publicKey));
        }

        case "AddKey": {
            const { publicKey, accessKey } = action.params;
            return transactions.addKey(utils.PublicKey.from(publicKey), getAccessKey(accessKey.permission));
        }

        case "DeleteKey": {
            const { publicKey } = action.params;
            return transactions.deleteKey(utils.PublicKey.from(publicKey));
        }

        case "DeleteAccount": {
            const { beneficiaryId } = action.params;
            return transactions.deleteAccount(beneficiaryId);
        }

        default:
            throw new Error("Invalid action type");
    }
};
