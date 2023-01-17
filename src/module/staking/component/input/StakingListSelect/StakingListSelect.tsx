import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import MainList from "module/main/component/display/MainList/MainList";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { useValidatorSelect } from "module/staking/hook/useValidatorSelect";
import { useEffect, useState, useTransition } from "react";
import StakingListItem from "../../core/StakingListItem/StakingListItem";

export interface StakingListProps {
    search?: string;
    onSelected: (validator: StakingValidator) => void;
}
const StakingListSelect = ({ search = "", onSelected }: StakingListProps): JSX.Element => {
    const [isPending, startTransition] = useTransition();
    const { validators: data, isLoading } = useValidatorSelect();
    const [dataList, setDataList] = useState<StakingValidator[]>(data ? data : []);

    useEffect(() => {
        startTransition(() => {
            if (search !== "" && data) {
                const searchReg = new RegExp(search, "i");
                setDataList(data.filter((item) => searchReg.test(item.accountId)));
            } else {
                if (data) {
                    setDataList(data);
                }
            }
        });
    }, [search]);

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

export default StakingListSelect;
