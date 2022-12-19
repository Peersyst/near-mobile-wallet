import ServiceInstances from "module/wallet/state/ServiceInstances/ServiceInstances";
import BaseMock, { MockFnType } from "../base.mock";
import { ImportWalletsReturnMock } from "./walletController.mock";

interface CreateInstanceReturnMockType {
    account: string;
    privateKey: string;
}

export class CreateInstanceReturnMock extends BaseMock {
    account: string;
    privateKey: string;
    constructor({ account, privateKey }: Partial<CreateInstanceReturnMockType>) {
        super();
        this.account = account ?? "firstWallet.near";
        this.privateKey = privateKey ?? "pK";
    }
}

interface AddServiceInstancesMockType {
    AddServiceInstancesMock: MockFnType;
    returnMock: ImportWalletsReturnMock[];
}

export class AddServiceInstancesMock extends BaseMock {
    AddServiceInstancesMock: MockFnType;
    returnMock: ImportWalletsReturnMock[];

    constructor({ AddServiceInstancesMock, returnMock }: Partial<AddServiceInstancesMockType> = {}) {
        super();
        this.returnMock = returnMock ?? [new ImportWalletsReturnMock()];
        this.AddServiceInstancesMock = AddServiceInstancesMock ?? jest.fn().mockResolvedValue(["account1", "account2"]);
        this.mock = jest.spyOn(ServiceInstances, "addServiceInstances").mockImplementation(this.AddServiceInstancesMock);
    }
}
