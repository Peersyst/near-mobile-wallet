import { atom } from "recoil";

export interface SendState {
    senderAddress?: string;
    receiverAddress?: string;
    amount?: string;
    message?: string;
}

const sendState = atom<SendState>({
    key: "send",
    default: {},
});

export default sendState;
