import { field, fixedArray, option } from "@dao-xyz/borsh";

export class SignerPayload {
    @field({ type: "u32" })
    tag: number; // Always the same tag: 2**31 + 413

    @field({ type: "string" })
    message: string; // The same message passed in `SignMessageParams.message`

    @field({ type: fixedArray("u8", 32) })
    nonce: number[]; // The same nonce passed in `SignMessageParams.nonce`

    @field({ type: "string" })
    recipient: string; // The same recipient passed in `SignMessageParams.recipient`

    @field({ type: option("string") })
    callbackUrl?: string;

    constructor({ message, nonce, recipient, callbackUrl }: SignerPayload) {
        this.tag = 2147484061;
        Object.assign(this, { message, nonce, recipient, callbackUrl });
    }
}
