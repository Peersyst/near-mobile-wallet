import useGetCurrentValidators from "module/staking/query/useGetCurrentValidators";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { Validator } from "near-peersyst-sdk";
import { useMemo } from "react";

export interface UseGetStakingValidatorsReturn {
    stakingValidators: Validator[];
    isIdle: boolean;
    isLoading: boolean;
    refetch: () => void;
}

export default function (): UseGetStakingValidatorsReturn {
    const {
        data: validators = [],
        isIdle: isIdleCurrentValidators,
        isLoading: isLoadingCurrentValidators,
        refetch: refetchCurrentValidators,
    } = useGetCurrentValidators();
    const {
        data: allValidators,
        isIdle: isIdleAllValidators,
        isLoading: isLoadingAllValidators,
        refetch: refetchAllValidators,
    } = useGetAllValidators();

    const handleRefetch = () => {
        refetchCurrentValidators();
        refetchAllValidators();
    };

    const allValidatorsMap = useMemo(() => {
        const map = new Map<string, Validator>();
        for (const validator of allValidators || []) {
            map.set(validator.accountId, validator);
        }
        return map;
    }, [allValidators]);

    function isCurrentValidatorActive(validatorAccountId: string): boolean {
        return allValidatorsMap.has(validatorAccountId);
    }

    const stakingValidators = useMemo(() => {
        return validators?.map((validator) => ({
            ...validator,
            active: isCurrentValidatorActive(validator.accountId),
        }));
    }, [validators, allValidatorsMap]);

    return {
        stakingValidators,
        isIdle: isIdleCurrentValidators || isIdleAllValidators,
        isLoading: isLoadingCurrentValidators || isLoadingAllValidators,
        refetch: handleRefetch,
    };
}
