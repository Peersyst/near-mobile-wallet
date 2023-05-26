import * as Genesys from "@peersyst/react-native-components";
import { envConfigs } from "config/configs";

import BaseMock, { MockFnType } from "mocks/common/base.mock";

export interface UseConfigMock {
    config: Genesys.Config;
    useConfig: MockFnType;
    key: keyof Genesys.Config;
}

export interface UseConfigMockOptions {
    config?: Partial<Genesys.Config>;
    useConfig?: MockFnType;
}

export class UseConfigMock extends BaseMock implements UseConfigMock {
    config: Genesys.Config;
    useConfig: MockFnType;

    constructor({ config, useConfig }: UseConfigMockOptions = {}) {
        super();
        this.config = { ...envConfigs.test, ...config } as Genesys.Config;
        this.useConfig = useConfig || jest.fn().mockImplementation((s?: keyof Genesys.Config) => this.config[s ?? this.key]);
        jest.spyOn(Genesys, "useConfig").mockImplementation(this.useConfig);
    }
}
