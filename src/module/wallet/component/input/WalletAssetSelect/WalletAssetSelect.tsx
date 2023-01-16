import { useControlled } from "@peersyst/react-hooks";
import { FormControl, FormControlLabel } from "@peersyst/react-native-components";
import { useModalState } from "module/common/hook/useModalState";
import { useGetAllAssets } from "module/wallet/query/useGetAllAssets";
import { AssetSelectProvider } from "./context/AssetSelectContext";
import AssetSelectDisplay from "./AssetSelectDisplay/AssetSelectDisplay";
import { WalletAssetSelectProps } from "./WalletAssetSelect.types";
import { WalletAssetSelectModal } from "./WalletAssetSelectModal/WalletAssetSelectModal";
import { Asset } from "module/wallet/wallet.types";

const WalletAssetSelect = ({ index, ...rest }: WalletAssetSelectProps) => {
    useGetAllAssets(index); //On mount start fetching all assets

    const { open, showModal, hideModal } = useModalState();
    const { value, defaultValue, onChange, LabelProps, ...assetSelectRest } = rest;
    const [asset, setAsset] = useControlled(defaultValue, value, onChange);

    const handleAssetChange = (asset: Asset | undefined) => {
        if (asset) {
            setAsset(asset);
            hideModal();
        }
    };

    return (
        <FormControl<Asset | undefined>
            value={asset}
            onChange={handleAssetChange}
            Label={[
                FormControlLabel,
                {
                    placement: "top",
                    ...LabelProps,
                },
            ]}
            defaultValue={defaultValue}
            {...assetSelectRest}
        >
            {() => (
                <AssetSelectProvider value={{ index, setSelectedAsset: handleAssetChange, asset }}>
                    <AssetSelectDisplay onPress={showModal} />
                    <WalletAssetSelectModal onClose={hideModal} open={open} />
                </AssetSelectProvider>
            )}
        </FormControl>
    );
};

export default WalletAssetSelect;
