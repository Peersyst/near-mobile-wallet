import { atom } from "recoil";
import { AssetType } from "module/wallet/wallet.types";
import { Asset } from "module/wallet/wallet.types";

export interface SendState {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    txHash?: string;
    asset: Asset;
}

const sendState = atom<SendState>({
    key: "send",
    default: {
        asset: { type: AssetType.NATIVE_TOKEN },
    },
});

export default sendState;
