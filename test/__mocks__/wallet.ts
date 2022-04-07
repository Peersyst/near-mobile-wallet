import { Wallet } from "module/wallet/state/WalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";

export const wallet: Wallet = {
    name: "firstWallet",
    index: 0,
    colorIndex: 0,
    serviceInstance: new CKBSDKService(""),
};
