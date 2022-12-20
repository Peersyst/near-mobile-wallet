import BaseMock, { MockFnType } from "mocks/common/base.mock";
import * as Genesys from "@peersyst/react-native-components";

export interface GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
    toastActive: boolean;
}

export class UseToastMock extends BaseMock implements GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
    toastActive: boolean;
    constructor({ hideToast = jest.fn(), showToast = jest.fn(), toastActive = false }: Partial<GenesysToastMock> = {}) {
        super();
        this.showToast = showToast;
        this.hideToast = hideToast;
        this.toastActive = toastActive;
        this.mock = jest.spyOn(Genesys, "useToast").mockReturnValue(this);
    }
}
