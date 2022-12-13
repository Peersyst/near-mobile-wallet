import BaseMock, { MockFnType } from "../base.mock";
import { CreateWalletState } from "module/wallet/state/CreateWalletState";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";

export class CreateWalletStateMock extends BaseMock implements CreateWalletState {
    name: string | undefined;
    pin: string | undefined;
    mnemonic: string[] | undefined;
    privateKey?: string | undefined;
    constructor({ name, pin, mnemonic, privateKey }: Partial<CreateWalletState> = {}) {
        super();
        this.name = name ?? "newWallet";
        this.pin = pin ?? "1234";
        this.mnemonic = mnemonic;
        this.privateKey = privateKey;
    }
}

interface UseCreateWalletMockType {
    state: CreateWalletStateMock;
    setName: MockFnType;
    setPin: MockFnType;
    setMnemonic: MockFnType;
    reset: MockFnType;
    setPrivateKey: MockFnType;
    setImportWithPrivateKey: MockFnType;
    setFundAccount: MockFnType;
}

export class UseCreateWalletMock extends BaseMock implements UseCreateWalletMockType {
    state: CreateWalletStateMock;
    setName: MockFnType;
    setPin: MockFnType;
    setMnemonic: MockFnType;
    setPrivateKey: MockFnType;
    setImportWithPrivateKey: MockFnType;
    reset: MockFnType;
    setFundAccount: MockFnType;
    constructor({
        state,
        setMnemonic = jest.fn(),
        setName = jest.fn(),
        setPin = jest.fn(),
        reset = jest.fn(),
        setImportWithPrivateKey = jest.fn(),
        setPrivateKey = jest.fn(),
        setFundAccount = jest.fn(),
    }: Partial<UseCreateWalletMockType> = {}) {
        super();
        this.state = state ?? new CreateWalletStateMock();
        this.setMnemonic = setMnemonic;
        this.setName = setName;
        this.setPin = setPin;
        this.reset = reset;
        this.setImportWithPrivateKey = setImportWithPrivateKey;
        this.setPrivateKey = setPrivateKey;
        this.setFundAccount = setFundAccount;
        this.mock = jest.spyOn(UseCreateWallet, "default").mockReturnValue(this);
    }
}
