import useGetBalance from "module/wallet/query/useGetBalance";
import { AssetType } from "module/wallet/wallet.types";
import BaseTokenSelectItem from "./BaseTokenSelectItem";
import { useAssetSelect } from "./hook/useAssetSelect";

const NEARSelectItem = (): JSX.Element => {
    const { index } = useAssetSelect();
    const { data: { available } = { available: "0" } } = useGetBalance(index);
    const { setSelectedAsset } = useAssetSelect();
    const handleOnPress = () => {
        setSelectedAsset({
            type: AssetType.TOKEN,
        });
    };
    return <BaseTokenSelectItem onPress={handleOnPress} units="token" balance={available} icon="" />;
};

export default NEARSelectItem;
