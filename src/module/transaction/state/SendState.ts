import { atom } from "recoil";
import { NftToken, Token } from "near-peersyst-sdk";
import { AssetType } from "module/wallet/wallet.types";

export interface SendState {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    nft?: NftToken;
    ft?: Token;
    asset: AssetType;
}

const sendState = atom<SendState>({
    key: "send",
    default: {
        asset: AssetType.TOKEN,
    },
});

export default sendState;
