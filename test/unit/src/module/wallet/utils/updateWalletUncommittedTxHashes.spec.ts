import { StorageWalletMock } from "mocks/storage";
import updateWalletUncommittedTxHashes from "module/wallet/utils/updateWalletUncommittedTxHashes";

describe("Test for the updateWalletUncommittedTxHashes function", () => {
    it("should update the uncommitted tx hashes", () => {
        const wallet = new StorageWalletMock({ name: "" });
        const wallet2 = new StorageWalletMock();

        updateWalletUncommittedTxHashes(wallet, txHash);

        expect(wallet.uncommittedTxHashes).toEqual(["hash1", "hash2", "hash3"]);
        expect(wallet.uncommittedTxHashesSet).toEqual(new Set(["hash1", "hash2", "hash3"]));
    });
});
