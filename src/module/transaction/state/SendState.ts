import { atom } from "recoil";
import { config } from "config";

export interface SendState {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    fee?: string;
    message?: string;
    token: string;
}

const sendState = atom<SendState>({
    key: "send",
    default: {
        token: config.tokenName,
    },
});

export default sendState;
