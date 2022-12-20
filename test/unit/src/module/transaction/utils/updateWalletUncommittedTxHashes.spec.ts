import { WalletUtils } from "module/wallet/utils/WalletUtils";
import { UnencryptedWalletInfoMock } from "test-mocks";

describe("Test for the updateWalletUncommittedTxHashes function", () => {
    test("should update the uncommitted tx hashes", () => {
        const wallet = new UnencryptedWalletInfoMock({ uncommittedTransactionHashes: ["tx1", "tx2"] });
        const wallet2 = new UnencryptedWalletInfoMock();

        const wallets = [wallet, wallet2];
        const updatedWallet = WalletUtils.updateWalletUncommittedTxHashes(wallets, ["tx3", "tx4"], 0);
        expect(updatedWallet[0].uncommittedTransactionHashes).toEqual(["tx3", "tx4"]);
    });
});
