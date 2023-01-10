import { AccountBalanceMock } from "mocks/NearSdk";
import * as UseWalletSelector from "module/wallet/hook/useWalletSelector";
import BaseMock from "../base.mock";
import { UseServiceInstanceMock } from "./useServiceInstance.mock";
import { WalletMock, WalletsMock } from "./wallet.mock";

export interface UseWalletSelectorMockType {
    selectedIndex: number | undefined;
    selectedWallet: WalletMock | undefined;
    handleChange: (i: number) => void;
    wallets: WalletMock[];
    error: boolean;
    balance: string;
}

export class UseWalletSelectorMock extends BaseMock implements UseWalletSelectorMockType {
    selectedIndex: number | undefined;
    selectedWallet: WalletMock | undefined;
    handleChange: (i: number) => void;
    wallets: WalletMock[];
    error: boolean;
    balance: string;

    constructor({
        selectedIndex = 0,
        selectedWallet,
        handleChange = jest.fn(),
        wallets = new WalletsMock({ length: 2 }).wallets,
        error = false,
        balance = "5",
    }: Partial<UseWalletSelectorMockType> = {}) {
        super();
        const { serviceInstance } = new UseServiceInstanceMock();
        const accountBalance = new AccountBalanceMock({ available: "5" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        this.selectedIndex = selectedIndex;
        this.wallets = wallets;
        this.selectedWallet = selectedWallet ?? wallets[selectedIndex];
        this.handleChange = handleChange;
        this.error = error;
        this.balance = balance;
        this.mock = jest.spyOn(UseWalletSelector, "default").mockReturnValue({
            selectedIndex,
            selectedWallet: this.selectedWallet,
            handleChange,
            wallets,
            error,
        });
    }
}
