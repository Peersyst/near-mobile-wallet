import BaseMock, { MockFnType } from "mocks/common/base.mock";
import * as Genesys from "@peersyst/react-native-components";

export interface GenesysUseShareMock {
    share: MockFnType;
    isSharing: boolean;
}

export class UseShareMock extends BaseMock implements GenesysUseShareMock {
    share: MockFnType;
    isSharing: boolean;

    constructor({ share = jest.fn(), isSharing = false }: Partial<GenesysUseShareMock> = {}) {
        super();
        this.isSharing = isSharing;
        this.share = share;
        this.mock = jest.spyOn(Genesys, "useShare").mockReturnValue(this);
    }
}
