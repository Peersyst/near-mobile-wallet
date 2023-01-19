import BaseMock, { MockFnType } from "mocks/common/base.mock";
import * as Genesys from "@peersyst/react-native-components";

export class UseSetTabMock extends BaseMock {
    setTab: MockFnType;
    constructor(setTab?: MockFnType) {
        super();
        this.setTab = setTab || jest.fn();
        this.mock = jest.spyOn(Genesys, "useSetTab").mockReturnValue(this.setTab);
    }
}
