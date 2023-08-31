import { DAppMock } from "../DApp.mock";
import BaseMock from "mocks/common/base.mock";
import { DApp } from "module/signer/types";
import * as useRecommendedDApps from "module/signer/hooks/useRecommendedDApps";
import { UseQueryResult } from "react-query";

export interface UseRecommendedDAppsMockType {
    dapps: DApp[];
}

export class UseRecommendedDAppsMock extends BaseMock {
    dapps: DApp[];
    constructor({ dapps }: Partial<UseRecommendedDAppsMockType> = {}) {
        super();
        this.dapps = dapps || [new DAppMock()];

        this.mock = jest
            .spyOn(useRecommendedDApps, "default")
            .mockReturnValue({ data: this.dapps, isLoading: false } as UseQueryResult<DApp[]>);
    }
}
