import { UseWalletStateResult } from "module/wallet/hook/useWalletState";
import BaseMock from "../base.mock";
import { WalletState, Wallet } from "module/wallet/state/WalletState";
import { SetterOrUpdater } from "recoil";
import { WalletStateMock } from "./walletState.mock";
import * as UseWalletState from "module/wallet/hook/useWalletState";

export interface UseWalletStateMockResult extends Omit<Partial<UseWalletStateResult>, "state"> {
    state?: UseWalletStateResult["state"];
}

export class UseWalletStateMock extends BaseMock implements UseWalletStateResult {
    state: WalletState;
    setState: SetterOrUpdater<WalletState>;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setWallets: (wallets: Wallet[]) => void;
    setSelectedWallet: (account: number) => void;
    reset: () => void;
    constructor({
        state = new WalletStateMock(),
        setState = jest.fn(),
        setAuthenticated = jest.fn(),
        setSelectedWallet = jest.fn(),
        setWallets = jest.fn(),
        reset = jest.fn(),
    }: Partial<UseWalletStateMockResult> = {}) {
        super();
        this.state = state;
        this.setState = setState;
        this.setAuthenticated = setAuthenticated;
        this.setSelectedWallet = setSelectedWallet;
        this.setWallets = setWallets;
        this.reset = reset;
        this.mock = jest.spyOn(UseWalletState, "default").mockReturnValue(this);
    }
}
