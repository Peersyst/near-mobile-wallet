import { useControlled } from "@peersyst/react-hooks";
import { useModalWrapper } from "module/common/hook/useModalWrapper";
import { useGetAllAssets } from "module/wallet/query/useGetAllAssets";
import { Asset, AssetSelectProps } from "./AssetSelect/AssetSelect.types";
import AssetSelectDisplay from "./AssetSelectDisplay/AssetSelectDisplay";
import { WalletAssetSelectModal } from "./WalletAssetSelectModal/WalletAssetSelectModal";

const WalletAssetSelect = ({ index, ...rest }: AssetSelectProps) => {
    useGetAllAssets(); //On mount start fetching all assets

    const { open, showModal, hideModal } = useModalWrapper();
    const { value, defaultValue, onChange, ...assetSelectRest } = rest;
    const [asset, setAsset] = useControlled(defaultValue, value, onChange);

    const handleAssetChange = (asset: Asset | undefined) => {
        if (asset) {
            setAsset(asset);
            hideModal();
        }
    };

    return (
        <>
            <WalletAssetSelectModal
                assetSelectProps={{ value: asset, onChange: handleAssetChange, index, ...assetSelectRest }}
                hideModal={hideModal}
                open={open}
            />
            <AssetSelectDisplay onPress={showModal} asset={asset} index={index} />
        </>
    );
};

export default WalletAssetSelect;
