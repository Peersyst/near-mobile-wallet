import * as Genesys from "@peersyst/react-native-components";
import BaseMock from "mocks/common/base.mock";
import { MockFnType } from "test-mocks";

export interface GenesysSetThemeMock {
    setTheme: MockFnType;
}

export class UseSetThemeMock extends BaseMock implements GenesysSetThemeMock {
    setTheme: MockFnType;
    constructor({ setTheme = jest.fn() }: Partial<GenesysSetThemeMock> = {}) {
        super();
        this.setTheme = setTheme;
        this.mock = jest.spyOn(Genesys, "useSetTheme").mockReturnValue(this.setTheme);
    }
}
