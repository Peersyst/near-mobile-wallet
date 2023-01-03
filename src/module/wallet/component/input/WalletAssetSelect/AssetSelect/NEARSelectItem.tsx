import useGetBalance from "module/wallet/query/useGetBalance";
import BaseTokenSelectItem from "./BaseTokenSelectItem";

const NEARSelectItem = () => {
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance();
    return <BaseTokenSelectItem units="token" balance={available} icon="" />;
};

export default NEARSelectItem;
