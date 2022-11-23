import { atom } from "recoil";
import { config } from "config";
import { AppCurrency } from "module/wallet/component/display/Balance/Balance.types";

export interface SendState {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    fee?: string;
    message?: string;
    token: AppCurrency | string;
}

const sendState = atom<SendState>({
    key: "send",
    default: {
        token: config.tokenName,
    },
});

export default sendState;
