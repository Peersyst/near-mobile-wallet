import { Col, Skeleton, Suspense } from "@peersyst/react-native-components";
import useGetNfts from "module/nft/query/useGetNfts";
import useGetTokens from "module/token/query/useGetTokens";
import useGetBalance from "module/wallet/query/useGetBalance";
import NEARSelectItem from "./NEARSelectItem";
import NftSelectItemList from "./NftSelectItemList";
import TokenSelectItemlist from "./TokenSelectItemlist";

export const ASSET_SELECT_MIN_HEIGHT = 280;
export const ASSET_SELECT_NUM_OF_SKELETONS = 2;

export const AssetSelectSkeletons = () => {
    return (
        <Col gap="5%" style={{ minHeight: ASSET_SELECT_MIN_HEIGHT }}>
            {Array.from({ length: ASSET_SELECT_NUM_OF_SKELETONS }).map((_, index) => (
                <Skeleton key={index}>
                    <NEARSelectItem />
                </Skeleton>
            ))}
        </Col>
    );
};

const AssetSelect = () => {
    const { isLoading: isNftsLoading } = useGetNfts(4);
    const { isLoading: isTokensLoading } = useGetTokens(2);
    const { isLoading: isBalanceLoading } = useGetBalance();
    const isLoading = isNftsLoading || isTokensLoading || isBalanceLoading;
    return (
        <Suspense isLoading={isLoading} fallback={<AssetSelectSkeletons />}>
            <Col style={{ minHeight: ASSET_SELECT_MIN_HEIGHT }}>
                <NEARSelectItem />
                <TokenSelectItemlist />
                <NftSelectItemList />
            </Col>
        </Suspense>
    );
};

export default AssetSelect;
