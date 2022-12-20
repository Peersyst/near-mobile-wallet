import useAddUncommittedTransaction from "module/transaction/hook/useAddUncommitedTransaction";
import { Chains } from "near-peersyst-sdk";
import { renderHook } from "test-utils";
import { WalletStorage } from "module/wallet/WalletStorage";
import { UseWalletStateMock, WalletMock, WalletStateMock } from "test-mocks";
import * as useUpdateUncommittedTransactionsState from "module/transaction/hook/useUpdateUncommitedTransactionsState";

export const renderUseAddUncommittedTransaction = () => {
    const { result } = renderHook(() => useAddUncommittedTransaction());
    return result.current;
};

describe("useAddUncommittedTransaction", () => {
    test("Works correctly when adding one tx without previous", () => {
        new UseWalletStateMock();
        const mockedAddUncommittedTransactionHash = jest.fn();
        const mockeduseUpdateUncommittedTransactionsState = jest.fn();
        jest.spyOn(useUpdateUncommittedTransactionsState, "default").mockReturnValue(mockeduseUpdateUncommittedTransactionsState);
        jest.spyOn(WalletStorage, "addUncommittedTransactionHash").mockImplementation(mockedAddUncommittedTransactionHash);
        const addUncommitedTx = renderUseAddUncommittedTransaction();
        expect(addUncommitedTx).toBeDefined();
        addUncommitedTx(0, Chains.TESTNET, "hash");
        expect(mockeduseUpdateUncommittedTransactionsState).toHaveBeenCalledWith(["hash"], 0);
        expect(mockedAddUncommittedTransactionHash).toBeCalledWith(0, Chains.TESTNET, "hash");
    });
    test("Works correctly when adding one tx with previous txs", () => {
        const wallet1 = new WalletMock({ uncommittedTransactionHashes: ["hash1"] });
        const wallet2 = new WalletMock({ uncommittedTransactionHashes: ["hash2"] });
        const state = new WalletStateMock({ wallets: [wallet1, wallet2] });
        new UseWalletStateMock({ state });
        const mockedAddUncommittedTransactionHash = jest.fn();
        const mockeduseUpdateUncommittedTransactionsState = jest.fn();
        jest.spyOn(useUpdateUncommittedTransactionsState, "default").mockReturnValue(mockeduseUpdateUncommittedTransactionsState);
        jest.spyOn(WalletStorage, "addUncommittedTransactionHash").mockImplementation(mockedAddUncommittedTransactionHash);
        const addUncommitedTx = renderUseAddUncommittedTransaction();
        expect(addUncommitedTx).toBeDefined();
        addUncommitedTx(0, Chains.TESTNET, "hash");
        expect(mockeduseUpdateUncommittedTransactionsState).toHaveBeenCalledWith(["hash1", "hash"], 0);
        expect(mockedAddUncommittedTransactionHash).toBeCalledWith(0, Chains.TESTNET, "hash");
        addUncommitedTx(1, Chains.TESTNET, "hash");
        expect(mockeduseUpdateUncommittedTransactionsState).toHaveBeenLastCalledWith(["hash2", "hash"], 1);
        expect(mockedAddUncommittedTransactionHash).toHaveBeenLastCalledWith(1, Chains.TESTNET, "hash");
    });
});
