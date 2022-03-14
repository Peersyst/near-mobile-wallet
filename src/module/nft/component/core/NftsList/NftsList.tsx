import Divider from "module/common/component/display/Divider/Divider";
import useWallet from "module/wallet/hook/useWallet";
import { List } from "react-native-components";
import useGetNfts from "module/nft/query/useGetNfts";
import NftCard from "module/nft/component/display/NftCard/NftCard";

const NftsList = (): JSX.Element => {
    const {
        state: { selectedAccount, cells },
    } = useWallet();
    const { data = [], refetch, isFetching } = useGetNfts(selectedAccount !== undefined ? cells[selectedAccount].address : undefined);

    return (
        <List
            onRefresh={refetch}
            refreshing={isFetching}
            data={data}
            renderItem={({ item: nft }) => <NftCard {...nft} />}
            keyExtractor={(tx) => tx.transactionHash}
            ItemSeparatorComponent={() => <Divider width="full-width" />}
            style={{ paddingHorizontal: "5%" }}
        />
    );
};

export default NftsList;
