import { createContext } from "react";
import { Asset } from "../AssetSelect.types";

export interface AssetSelectContextInterface {
    index: number;
    setSelectedAsset: (asset: Asset) => void;
}

export const AssetSelectContext = createContext<AssetSelectContextInterface>({
    index: 0,
    setSelectedAsset: () => undefined,
});

export const AssetSelectProvider = AssetSelectContext.Provider;
export const AssetSelectConsumer = AssetSelectContext.Consumer;
