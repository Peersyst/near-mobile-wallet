import * as UseGetAllAssets from "module/wallet/query/useGetAllAssets";
import BaseMock from "../base.mock";

export class UseGetAllAssetsMock extends BaseMock {
    isLoading: boolean;
    constructor({ isLoading }: { isLoading: boolean }) {
        super();
        this.isLoading = isLoading;
        this.mock = jest.spyOn(UseGetAllAssets, "useGetAllAssets").mockReturnValue(this);
    }
}
