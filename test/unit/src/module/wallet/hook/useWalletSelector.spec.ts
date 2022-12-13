import useWalletSelector, { UseWalletSelectorParams } from "module/wallet/hook/useWalletSelector";
import { AccountBalanceMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { renderHook, waitFor } from "test-utils";

export const renderUseWalletSelector = () => {
    return renderHook((params: UseWalletSelectorParams = {}) => {
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
            handleChange: expect.any(Function),
            wallets: wallets,
            error: true,
        });
        await waitFor(() => expect(serviceInstance.getAccountBalance).toBeCalledTimes(1));
        expect(useWalletSelector.current).toEqual({
            selectedIndex: 0,
            selectedWallet: wallets[0],
            handleChange: expect.any(Function),
            wallets: wallets,
            error: false,
        });
    });

    test("Return default values and with error", async () => {
        const {
            state: { wallets },
        } = new UseWalletStateMock();
        const { serviceInstance } = new UseServiceInstanceMock();
        const accountBalance = new AccountBalanceMock({ available: "0.09" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        const useWalletSelector = renderUseWalletSelector();
        expect(useWalletSelector.current).toEqual({
            selectedIndex: 0,
            selectedWallet: wallets[0],
            handleChange: expect.any(Function),
            wallets: wallets,
            error: true,
        });
        await waitFor(() => expect(serviceInstance.getAccountBalance).toBeCalledTimes(1));
        expect(useWalletSelector.current).toEqual({
            selectedIndex: 0,
            selectedWallet: wallets[0],
            handleChange: expect.any(Function),
            wallets: wallets,
            error: true,
        });
    });
});
