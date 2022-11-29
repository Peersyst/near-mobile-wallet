import ServiceInstance from "module/wallet/state/ServiceInstance/ServiceInstance";
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
    addServiceInstanceMock: MockFnType;
    returnMock: ImportWalletsReturnMock[];
}

export class AddServiceInstancesMock extends BaseMock {
    addServiceInstanceMock: MockFnType;
    returnMock: ImportWalletsReturnMock[];

    constructor({ addServiceInstanceMock, returnMock }: Partial<AddServiceInstancesMockType> = {}) {
        super();
        this.returnMock = returnMock ?? [new ImportWalletsReturnMock()];
        this.addServiceInstanceMock = addServiceInstanceMock ?? jest.fn().mockResolvedValue(["account1", "account2"]);
        this.mock = jest.spyOn(ServiceInstance, "addServiceInstances").mockImplementation(this.addServiceInstanceMock);
    }
}
