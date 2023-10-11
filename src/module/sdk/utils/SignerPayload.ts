interface SignMessageParams {
    message: string;
    nonce: Buffer;
    recipient: string;
    callbackUrl?: string;
}

export class Payload {
    message: string;
    nonce: Buffer;
    recipient: string;
    callbackUrl?: string;
    prefix: number;

    constructor({ message, nonce, recipient, callbackUrl }: SignMessageParams) {
        this.prefix = 2147484061;
        this.message = message;
        this.nonce = nonce;
        this.recipient = recipient;
        if (callbackUrl) {
            this.callbackUrl = callbackUrl;
        }
    }
}
