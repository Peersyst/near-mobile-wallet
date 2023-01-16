import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import MainList from "module/main/component/display/MainList/MainList";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { Validator } from "near-peersyst-sdk";
import { useEffect, useState, useTransition } from "react";
import StakingListItem from "../StakingListItem/StakingListItem";

export interface StakingListProps {
    search?: string;
    onSelected: (validator: Validator) => void;
}
const StakingList = ({ search = "", onSelected }: StakingListProps): JSX.Element => {
    const { index } = useSelectedWallet();
    const [isPending, startTransition] = useTransition();
    const { isLoading, data } = useGetAllValidators(index);
    const [dataList, setDataList] = useState<Validator[]>([]);

    useEffect(() => {
        startTransition(() => {
            if (search !== "" && data) {
                const searchReg = new RegExp(search, "i");
                setDataList(data.filter((item) => searchReg.test(item.accountId)));
            }
        });
    }, [search]);

    useEffect(() => {
        if (data) {
            setDataList(data);
        }
    }, [isLoading]);

    return (
        <MainList
            loading={isLoading || isPending}
            ListEmptyComponent={isLoading ? data && dataList.length < 1 ? <EmptyListComponent /> : undefined : <EmptyListComponent />}
            data={dataList.length ? dataList : []}
            renderItem={({ item: validator }) => <StakingListItem validator={validator} onSelected={onSelected} />}
            keyExtractor={(item) => item.accountId}
        />
    );
};

export default StakingList;
