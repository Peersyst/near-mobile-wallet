import { Col } from "@peersyst/react-native-components";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import MainList from "module/main/component/display/MainList/MainList";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { useValidatorSelect } from "module/staking/hook/useValidatorSelect";
import { useEffect, useState, useTransition } from "react";
import StakingListItemSelect from "../StakingListItemSelect/StakingListItemSelect";

export interface StakingListProps {
    search?: string;
}
const ValidatorListSelect = ({ search = "" }: StakingListProps): JSX.Element => {
    const [isPending, startTransition] = useTransition();
    const { validators: data, isLoading, onSelected } = useValidatorSelect();
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
    }, [search, data]);

    const haveElementList = data && dataList.length ? true : false;
    const showEmptyList = isLoading ? true : haveElementList ? false : true;

    return (
        <MainList
            loading={isLoading || isPending}
            ListEmptyComponent={showEmptyList ? <EmptyListComponent /> : undefined}
            data={dataList.length ? dataList : []}
            renderItem={({ item: validator }) => <StakingListItemSelect validator={validator} onSelected={onSelected} />}
            keyExtractor={(item) => item.accountId}
        />
    );
};

export default ValidatorListSelect;
