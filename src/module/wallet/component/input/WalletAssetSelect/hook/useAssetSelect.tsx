import { useContext } from "react";
import { AssetSelectContext, AssetSelectContextInterface } from "../context/AssetSelectContext";

export const useAssetSelect = (): AssetSelectContextInterface => {
    return useContext(AssetSelectContext);
};
