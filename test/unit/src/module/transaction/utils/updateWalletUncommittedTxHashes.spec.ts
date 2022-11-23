import { StorageWalletMock, UnencryptedWalletChainInfoMock } from "mocks/storage";
import { NetworkType } from "module/settings/state/SettingsState";
import updateWalletUncommittedTxHashes from "module/wallet/utils/updateWalletUncommittedTxHashes";
import { Chains } from "near-peersyst-sdk";

describe("Test for the updateWalletUncommittedTxHashes function", () => {
    test("should update the uncommitted tx hashes", () => {
        const testnet = new UnencryptedWalletChainInfoMock({ uncommittedTransactionHashes: ["tx1", "tx2"] });
        const mainnet = new UnencryptedWalletChainInfoMock();
        const wallet = new StorageWalletMock({ testnet, mainnet });
        const wallet2 = new StorageWalletMock();
        const wallets = [wallet, wallet2];
        const network: NetworkType = Chains.TESTNET;
        const updatedWallet = updateWalletUncommittedTxHashes(wallets, 0, network, ["tx3", "tx4"]);
        expect(wallet.testnet?.uncommittedTransactionHashes).toEqual(["tx1", "tx2"]);
        expect(updatedWallet[0].testnet?.uncommittedTransactionHashes).toEqual(["tx3", "tx4"]);
    });
});
