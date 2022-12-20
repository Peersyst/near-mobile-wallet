import BaseMock from "mocks/common/base.mock";
import { MockFnType } from "test-mocks";
import * as Genesys from "@peersyst/react-native-components";

export interface GenesysModalMock {
    showModal: MockFnType;
    hideModal: MockFnType;
    isModalActive: MockFnType;
}

export class UseModalMock extends BaseMock implements GenesysModalMock {
    showModal: MockFnType;
    hideModal: MockFnType;
    isModalActive: MockFnType;
    constructor({ showModal = jest.fn(), hideModal = jest.fn(), isModalActive = jest.fn() }: Partial<GenesysModalMock> = {}) {
        super();
        this.hideModal = hideModal;
        this.showModal = showModal;
        this.isModalActive = isModalActive;
        jest.spyOn(Genesys, "useModal").mockReturnValue(this);
    }
}
