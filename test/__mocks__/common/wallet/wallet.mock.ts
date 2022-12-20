import { Wallet } from "module/wallet/state/WalletState";
import BaseMock from "../base.mock";

export class WalletMock extends BaseMock implements Wallet {
    account: Wallet["account"];
    colorIndex: Wallet["colorIndex"];
    imported: Wallet["imported"];
    index: Wallet["index"];
    uncommittedTransactionHashes: Wallet["uncommittedTransactionHashes"];

    constructor({
        index = 0,
        account = "firstWallet",
        colorIndex = 0,
        imported = false,
        uncommittedTransactionHashes = [],
    }: Partial<Wallet> = {}) {
        super();
        this.index = index;
        this.account = account;
        this.colorIndex = colorIndex;
        this.imported = imported;
        this.uncommittedTransactionHashes = uncommittedTransactionHashes;
    }
}
