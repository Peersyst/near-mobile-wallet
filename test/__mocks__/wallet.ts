import { Wallet } from "module/wallet/state/WalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

export const wallet: Wallet = {
    name: "firstWallet",
    index: 0,
    colorIndex: 0,
    serviceInstance: new CkbServiceMock([]),
};
