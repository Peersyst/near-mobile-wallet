import { FeeRate } from "@peersyst/ckb-peersyst-sdk";
import { atom } from "recoil";

export interface SendState {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    fee?: FeeRate;
    message?: string;
}

const sendState = atom<SendState>({
    key: "send",
    default: {},
});

export default sendState;
