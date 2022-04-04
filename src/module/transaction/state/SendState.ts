import { FeeType } from "module/settings/state/SettingsState";
import { atom } from "recoil";

export interface SendState {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    fee?: FeeType;
    message?: string;
}

const sendState = atom<SendState>({
    key: "send",
    default: {},
});

export default sendState;
