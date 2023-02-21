import * as UseAssetSelect from "module/wallet/component/input/WalletAssetSelect/hook/useAssetSelect";
import { AssetMock } from ".";
import BaseMock, { MockFnType } from "../base.mock";

export interface UseAssetSelectMockInterface {
    index: number;
    setSelectedAsset: MockFnType;
    asset: AssetMock | undefined;
}

export class UseAssetSelectMock extends BaseMock implements UseAssetSelectMockInterface {
    index: number;
    setSelectedAsset: MockFnType;
    asset: AssetMock | undefined;

    constructor({ index, setSelectedAsset, asset }: Partial<UseAssetSelectMockInterface> = {}) {
        super();
        this.index = index ?? 0;
        this.setSelectedAsset = setSelectedAsset ?? jest.fn();
        this.asset = asset ?? new AssetMock();
        this.mock = jest.spyOn(UseAssetSelect, "useAssetSelect").mockReturnValue(this);
    }
}
