import BaseMock from "mocks/common/base.mock";
import { AccessKey, Action, ActionKind, EnhancedTransactionActionKind } from "near-peersyst-sdk";
import { TransactionWithoutActionsMock } from "./transaction.mock";

export interface ActionMockType extends Omit<Action, "transaction"> {
    transaction: TransactionWithoutActionsMock;
}

export class ActionMock extends BaseMock implements Action {
    transactionHash: string;
    indexInTransaction: number;
    codeSha256?: string | undefined;
    gas?: number | undefined;
    deposit?: string | undefined;
    argsBase64?: string | undefined;
    argsJson?: any;
    methodName?: string | undefined;
    stake?: string | undefined;
    publicKey?: string | undefined;
    accessKey?: AccessKey | undefined;
    beneficiaryId?: string | undefined;
    actionKind: ActionKind;
    transaction: TransactionWithoutActionsMock;
    constructor({
        transactionHash,
        indexInTransaction,
        codeSha256,
        gas,
        deposit,
        argsBase64,
        argsJson,
        methodName,
        stake,
        publicKey,
        accessKey,
        beneficiaryId,
        actionKind,
        transaction,
    }: Partial<ActionMockType> = {}) {
        super();
        this.transactionHash = transactionHash || "transactionHash";
        this.indexInTransaction = indexInTransaction || 0;
        this.codeSha256 = codeSha256;
        this.gas = gas;
        this.deposit = deposit;
        this.argsBase64 = argsBase64;
        this.argsJson = argsJson;
        this.methodName = methodName;
        this.stake = stake;
        this.publicKey = publicKey;
        this.accessKey = accessKey;
        this.beneficiaryId = beneficiaryId;
        this.actionKind = actionKind || EnhancedTransactionActionKind.TRANSFER_RECEIVE;
        this.transaction = transaction || new TransactionWithoutActionsMock();
    }
}
