import useUpdateUncommitedTransactionsState from "module/transaction/hook/useUpdateUncommitedTransactionsState";
import { updateWalletUncommittedTxHashes } from "module/wallet/utils/wallet.utils";
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
        const { index, network } = new UseServiceInstanceMock();
        const updateHashes = renderUseUpdateUncommitedTransactionsState();
        expect(updateHashes).toBeDefined();
        const hashes = ["hash1", "hash2"];
        updateHashes(hashes);
        expect(setWalletsMock).toBeCalledWith(updateWalletUncommittedTxHashes(wallets, index, network, hashes));
    });
});
