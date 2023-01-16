import { createContext } from "react";
import { Asset } from "../WalletAssetSelect.types";

export interface AssetSelectContextInterface {
    index: number;
    setSelectedAsset: (asset: Asset) => void;
    asset: Asset | undefined;
}

export const AssetSelectContext = createContext<AssetSelectContextInterface>({
    index: 0,
    setSelectedAsset: () => undefined,
    asset: undefined,
});

export const AssetSelectProvider = AssetSelectContext.Provider;
export const AssetSelectConsumer = AssetSelectContext.Consumer;
