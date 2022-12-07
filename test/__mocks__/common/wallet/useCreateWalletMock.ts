import BaseMock, { MockFnType } from "../base.mock";
import { CreateWalletState } from "module/wallet/state/CreateWalletState";
import { MnemonicMocked } from "../../MnemonicMocked";
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
        this.mnemonic = mnemonic ?? MnemonicMocked.split(" ");
        this.privateKey = privateKey;
    }
}

interface UseCreateWalletMockType {
    state: CreateWalletStateMock;
    setName: MockFnType;
    setPin: MockFnType;
    setMnemonic: MockFnType;
    reset: MockFnType;
}

export class UseCreateWalletMock extends BaseMock implements UseCreateWalletMockType {
    state: CreateWalletStateMock;
    setName: MockFnType;
    setPin: MockFnType;
    setMnemonic: MockFnType;
    reset: MockFnType;
    constructor({
        state,
        setMnemonic = jest.fn(),
        setName = jest.fn(),
        setPin = jest.fn(),
        reset = jest.fn(),
    }: Partial<UseCreateWalletMockType> = {}) {
        super();
        this.state = state ?? new CreateWalletStateMock();
        this.setMnemonic = setMnemonic;
        this.setName = setName;
        this.setPin = setPin;
        this.reset = reset;
        this.mock = jest.spyOn(UseCreateWallet, "default").mockReturnValue(this);
    }
}
