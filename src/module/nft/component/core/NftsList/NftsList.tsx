import useWallet from "module/wallet/hook/useWallet";
import { Typography } from "react-native-components";
import useGetNfts from "module/nft/query/useGetNfts";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";

const NoNftsComponent = (): JSX.Element => {
    return (
        <Typography variant="body1" textAlign="center" style={{ marginTop: "10%" }}>
            {translate("no_nfts")}
        </Typography>
    );
};

const NftsList = (): JSX.Element => {
    const {
        state: { selectedAccount, cells },
    } = useWallet();
    const {
        data = [],
        refetch,
        isFetching,
        isLoading,
    } = useGetNfts(selectedAccount !== undefined ? cells[selectedAccount].address : undefined);

    return (
        <MainList
            onRefresh={refetch}
            refreshing={isFetching || isLoading}
            data={data}
            renderItem={({ item: nft }) => <NftCard {...nft} />}
            ListEmptyComponent={isLoading ? undefined : NoNftsComponent}
            keyExtractor={(tx) => tx.transactionHash}
        />
    );
};

export default NftsList;
