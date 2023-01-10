import { atom } from "recoil";
import { AssetType } from "module/wallet/wallet.types";
import { Asset } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect.types";

export interface SendState {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    asset: Asset;
}

const sendState = atom<SendState>({
    key: "send",
    default: {
        asset: { type: AssetType.TOKEN },
    },
});

export default sendState;
