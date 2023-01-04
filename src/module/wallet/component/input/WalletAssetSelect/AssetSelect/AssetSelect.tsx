import { Col, FormControl, Label, Skeleton, Suspense } from "@peersyst/react-native-components";
import { useGetAllAssets } from "module/wallet/query/useGetAllAssets";
import { Asset, AssetSelectProps } from "./AssetSelect.types";
import { AssetSelectProvider } from "./context/AssetSelectContext";
import NEARSelectItem from "./NEARSelectItem";
import NftSelectItemList from "./NftSelectItemList";
import TokenSelectItemlist from "./TokenSelectItemlist";

export const ASSET_SELECT_NUM_OF_SKELETONS = 2;

export const AssetSelectSkeletons = () => {
    return (
        <Col gap="5%">
            {Array.from({ length: ASSET_SELECT_NUM_OF_SKELETONS }).map((_, i) => (
                <Skeleton key={i}>
                    <NEARSelectItem />
                </Skeleton>
            ))}
        </Col>
    );
};

const AssetSelect = ({ index, LabelProps, defaultValue, ...rest }: AssetSelectProps) => {
    const { isLoading } = useGetAllAssets(index);
    return (
        <FormControl<Asset | undefined> Label={[Label, { placement: "top", ...LabelProps }]} defaultValue={defaultValue} {...rest}>
            {(_, setValue) => (
                <AssetSelectProvider value={{ index, setSelectedAsset: setValue }}>
                    <Suspense isLoading={isLoading} fallback={<AssetSelectSkeletons />}>
                        <Col>
                            <NEARSelectItem />
                            <TokenSelectItemlist />
                            <NftSelectItemList />
                        </Col>
                    </Suspense>
                </AssetSelectProvider>
            )}
        </FormControl>
    );
};

export default AssetSelect;
