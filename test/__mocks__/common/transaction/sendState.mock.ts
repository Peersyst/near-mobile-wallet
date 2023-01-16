import { MOCKED_NAMED_ADDRESS } from "mocks/NearSdk";
import BaseMock from "../base.mock";
import { AssetMock } from "../wallet";

export interface SendStateMockInterface {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    asset: AssetMock;
}

export class SendStateMock extends BaseMock implements SendStateMockInterface {
    senderWalletIndex?: number;
    receiverAddress?: string;
    amount?: string;
    asset: AssetMock;
    constructor({ senderWalletIndex, receiverAddress, amount, asset }: Partial<SendStateMockInterface> = {}) {
        super();
        this.asset = asset || new AssetMock();
        this.senderWalletIndex = senderWalletIndex || 0;
        this.receiverAddress = receiverAddress || MOCKED_NAMED_ADDRESS;
        this.amount = amount || "1";
    }
}
