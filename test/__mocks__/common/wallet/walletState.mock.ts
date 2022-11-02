import { UseWalletStateResult } from "module/wallet/hook/useWalletState";
import { WalletMock } from "./wallet.mock";
import BaseMock from "../base.mock";
import { Wallet, WalletState } from "module/wallet/state/WalletState";

export class WalletStateMock extends BaseMock implements WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    wallets: Wallet[];
    isFirstTime: boolean;
    selectedWallet?: number | undefined;
    constructor({
        hasWallet = true,
        isAuthenticated = true,
        wallets = [new WalletMock(), new WalletMock()],
        isFirstTime = false,
        selectedWallet = 0,
    }: Partial<UseWalletStateResult["state"]> = {}) {
        super();
        this.hasWallet = hasWallet;
        this.isAuthenticated = isAuthenticated;
        this.wallets = wallets;
        this.isFirstTime = isFirstTime;
        this.selectedWallet = selectedWallet;
    }
}
