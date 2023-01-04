import { Col, Skeleton, Suspense } from "@peersyst/react-native-components";
import { useGetAllAssets } from "module/wallet/query/useGetAllAssets";
import { useAssetSelect } from "../hook/useAssetSelect";
import NEARSelectItem from "./NEARSelectItem";
import NftSelectItemList from "./NftSelectItemList";
import TokenSelectItemlist from "./TokenSelectItemlist";

export const ASSET_SELECT_NUM_OF_SKELETONS = 2;

export const InnerAssetSelectSkeletons = () => {
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

const InnerAssetSelect = () => {
    const { index } = useAssetSelect();
    const { isLoading } = useGetAllAssets(index);
    return (
        <Suspense isLoading={isLoading} fallback={<InnerAssetSelectSkeletons />}>
            <Col>
                <NEARSelectItem />
                <TokenSelectItemlist />
                <NftSelectItemList />
            </Col>
        </Suspense>
    );
};

export default InnerAssetSelect;
