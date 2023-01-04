import { useControlled } from "@peersyst/react-hooks";
import { useModalWrapper } from "module/common/hook/useModalWrapper";
import { useGetAllAssets } from "module/wallet/query/useGetAllAssets";
import { Asset } from "./AssetSelect/AssetSelect.types";
import AssetSelectDisplay from "./AssetSelectDisplay/AssetSelectDisplay";
import { WalletAssetSelectProps } from "./WalletAssetSelect.types";
import { WalletAssetSelectModal } from "./WalletAssetSelectModal/WalletAssetSelectModal";

const WalletAssetSelect = (props: WalletAssetSelectProps) => {
    useGetAllAssets(); //On mount start fetching all assets

    const { open, showModal, hideModal } = useModalWrapper();
    const { value, defaultValue, onChange, ...assetSelectRest } = props;
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
                assetSelectProps={{ value: asset, onChange: handleAssetChange, ...assetSelectRest }}
                hideModal={hideModal}
                open={open}
            />
            <AssetSelectDisplay onPress={showModal} asset={asset} />
        </>
    );
};

export default WalletAssetSelect;
