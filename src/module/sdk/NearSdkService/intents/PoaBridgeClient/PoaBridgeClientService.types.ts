export type JSONRPCRequest<Method, Params> = {
    id: string;
    jsonrpc: "2.0";
    method: Method;
    params: Params[];
};

export type JSONRPCResponse<Result> = {
    id: string;
    jsonrpc: "2.0";
    result: Result;
};

export type GetSupportedTokensRequest = JSONRPCRequest<
    "supported_tokens",
    {
        chains?: string[];
    }
>;

export type GetSupportedTokensResponse = JSONRPCResponse<{
    tokens: {
        defuse_asset_identifier: string;
        decimals: number;
        asset_name: string;
        near_token_id: string;
        min_deposit_amount: string;
        min_withdrawal_amount: string;
        withdrawal_fee: string;
    }[];
}>;

export type GetDepositAddressRequest = JSONRPCRequest<
    "deposit_address",
    {
        account_id: string;
        /** Chain is joined blockchain and network (e.g. eth:8453) */
        chain: string;
    }
>;

export type GetDepositAddressResponse = JSONRPCResponse<{
    address: string;
    chain: string;
}>;

export type DepositStatus = {
    tx_hash: string;
    chain: string;
    defuse_asset_identifier: string;
    near_token_id: string;
    decimals: number;
    amount: number;
    account_id: string;
    address: string;
    status: "COMPLETED" | "PENDING" | "FAILED";
};

export type GetDepositStatusRequest = JSONRPCRequest<
    "recent_deposits",
    {
        account_id: string;
        chain?: string;
    }
>;

export type GetDepositStatusResponse = JSONRPCResponse<{
    deposits: DepositStatus[];
}>;

export class FetchError extends Error {
    name = "FetchError";
}

export class ResponseError extends Error {
    name = "ResponseError";
    constructor(
        public response: Response,
        msg?: string,
    ) {
        super(msg);
    }
}
