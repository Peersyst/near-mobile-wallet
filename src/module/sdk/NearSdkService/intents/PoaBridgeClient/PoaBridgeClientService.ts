import {
    GetSupportedTokensRequest,
    GetSupportedTokensResponse,
    GetDepositAddressRequest,
    GetDepositAddressResponse,
    GetDepositStatusRequest,
    GetDepositStatusResponse,
    FetchError,
    ResponseError,
    JSONRPCRequest,
} from "./PoaBridgeClientService.types";

export class PoaBridgeClientService {
    constructor(private readonly url = "https://bridge.chaindefuser.com") {}

    async getSupportedTokens(params: GetSupportedTokensRequest["params"][0]): Promise<GetSupportedTokensResponse["result"]> {
        const json = await this.jsonRPCRequest<GetSupportedTokensRequest>("supported_tokens", params);
        return json.result;
    }

    async getDepositAddress(params: GetDepositAddressRequest["params"][0]): Promise<GetDepositAddressResponse["result"]> {
        const json = await this.jsonRPCRequest<GetDepositAddressRequest>("deposit_address", params);
        return json.result;
    }

    async getDepositStatus(params: GetDepositStatusRequest["params"][0]): Promise<GetDepositStatusResponse["result"]> {
        const json = await this.jsonRPCRequest<GetDepositStatusRequest>("recent_deposits", params);
        return json.result ?? { deposits: [] };
    }

    async request(url: string, body: unknown): Promise<Response> {
        let response: Response;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
        } catch (err) {
            throw new FetchError("The request failed", { cause: err });
        }

        if (response.ok) {
            return response;
        }

        throw new ResponseError(response, "Response returned an error code");
    }

    async jsonRPCRequest<T extends JSONRPCRequest<unknown, unknown>>(method: T["method"], params: T["params"][0]) {
        const response = await this.request(`${this.url}/rpc`, {
            id: "dontcare",
            jsonrpc: "2.0",
            method,
            params: params !== undefined ? [params] : undefined,
        });
        return response.json();
    }
}
