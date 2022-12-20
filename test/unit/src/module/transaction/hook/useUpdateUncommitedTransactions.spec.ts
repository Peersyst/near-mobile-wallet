import useUpdateUncommitedTransactionsState from "module/transaction/hook/useUpdateUncommitedTransactionsState";
import { WalletUtils } from "module/wallet/utils/WalletUtils";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { renderHook } from "test-utils";

const renderUseUpdateUncommitedTransactionsState = () => {
    return renderHook(() => useUpdateUncommitedTransactionsState()).result.current;
};

describe("useUpdateUncommitedTransactions test", () => {
    test("Update wallets correctly", () => {
        const setWalletsMock = jest.fn();
        const {
            state: { wallets },
        } = new UseWalletStateMock({ setWallets: setWalletsMock });
        const { index } = new UseServiceInstanceMock();
        const updateHashes = renderUseUpdateUncommitedTransactionsState();
        expect(updateHashes).toBeDefined();
        const hashes = ["hash1", "hash2"];
        updateHashes(hashes);
        expect(setWalletsMock).toBeCalledWith(WalletUtils.updateWalletUncommittedTxHashes(wallets, hashes, index));
    });
});
