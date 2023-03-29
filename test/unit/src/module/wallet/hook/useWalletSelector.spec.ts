import useWalletSelector, { UseWalletSelectorParams } from "module/wallet/hook/useWalletSelector";
import { config } from "config";
import { AccountBalanceMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { renderHook, translate, waitFor } from "test-utils";

export const renderUseWalletSelector = (params: UseWalletSelectorParams = {}) => {
    return renderHook(() => {
        const recoverWallets = useWalletSelector(params);
        return recoverWallets;
    }).result;
};

describe("useWalletSelector tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Return default values", async () => {
        const {
            state: { wallets },
        } = new UseWalletStateMock();
        const { serviceInstance } = new UseServiceInstanceMock();
        const accountBalance = new AccountBalanceMock({ available: "5" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        const useWalletSelector = renderUseWalletSelector();
        expect(useWalletSelector.current).toEqual({
            selectedIndex: 0,
            selectedWallet: wallets[0],
            setWalletIndex: expect.any(Function),
            wallets: wallets,
            error: undefined,
            hideError: true,
        });
        await waitFor(() => expect(serviceInstance.getAccountBalance).toBeCalledTimes(1));
        expect(useWalletSelector.current).toEqual({
            selectedIndex: 0,
            selectedWallet: wallets[0],
            setWalletIndex: expect.any(Function),
            wallets: wallets,
            error: undefined,
            hideError: false,
        });
    });

    test("Return default values and with error", async () => {
        const {
            state: { wallets },
        } = new UseWalletStateMock();
        const { serviceInstance } = new UseServiceInstanceMock();
        const accountBalance = new AccountBalanceMock({ available: "0.09" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        const useWalletSelector = renderUseWalletSelector({ minBalance: config.minBalanceToCreateAccount });
        expect(useWalletSelector.current).toEqual({
            selectedIndex: 0,
            selectedWallet: wallets[0],
            setWalletIndex: expect.any(Function),
            wallets: wallets,
            hideError: true,
            error: [true, translate("invalid_selected_account", { ns: "error", amountInNEAR: config.minBalanceToCreateAccount })],
        });
        await waitFor(() => expect(serviceInstance.getAccountBalance).toBeCalledTimes(1));
        expect(useWalletSelector.current).toEqual({
            selectedIndex: 0,
            selectedWallet: wallets[0],
            setWalletIndex: expect.any(Function),
            wallets: wallets,
            hideError: false,
            error: [true, translate("invalid_selected_account", { ns: "error", amountInNEAR: config.minBalanceToCreateAccount })],
        });
    });
});
