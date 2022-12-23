import BaseMock from "mocks/common/base.mock";
import { TransactionStatus, TransactionWithoutActions } from "near-peersyst-sdk";
import { MOCKED_ADDRESS, MOCKED_NAMED_ADDRESS } from "./NearSdk.mock";

export class TransactionWithoutActionsMock extends BaseMock implements TransactionWithoutActions {
    transactionHash: string;
    includedInBlockHash: string;
    blockTimestamp: string;
    signerAccountId: string;
    nonce?: number | undefined;
    receiverAccountId: string;
    status?: TransactionStatus | undefined;
    constructor({
        transactionHash,
        includedInBlockHash,
        blockTimestamp,
        signerAccountId,
        nonce,
        receiverAccountId,
        status,
    }: Partial<TransactionWithoutActions> = {}) {
        super();
        this.transactionHash = transactionHash || "transactionHash";
        this.includedInBlockHash = includedInBlockHash || "includedInBlockHash";
        this.blockTimestamp = blockTimestamp || "blockTimestamp";
        this.signerAccountId = signerAccountId || MOCKED_NAMED_ADDRESS;
        this.nonce = nonce;
        this.receiverAccountId = receiverAccountId || MOCKED_ADDRESS;
        this.status = status;
    }
}
