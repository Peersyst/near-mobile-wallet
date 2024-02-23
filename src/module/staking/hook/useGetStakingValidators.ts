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
        data: validators,
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

    const isCurrentValidatorActive = (validatorAccountId: string): boolean => {
        if (allValidators) return allValidators.some(({ accountId }) => accountId === validatorAccountId);
        return false;
    };

    const { stakingValidators, isIdle, isLoading } = useMemo(() => {
        if (validators) {
            const stakingValidators: Validator[] = validators?.map((validator) => {
                const stakingValidator: Validator = {
                    active: isCurrentValidatorActive(validator.accountId),
                    ...validator,
                };
                return stakingValidator;
            });
            return {
                stakingValidators,
                isIdle: isIdleCurrentValidators || isIdleAllValidators,
                isLoading: isLoadingCurrentValidators || isLoadingAllValidators,
                refetch: handleRefetch,
            };
        }
        return {
            stakingValidators: [],
            isIdle: isIdleCurrentValidators || isIdleAllValidators,
            isLoading: isLoadingCurrentValidators || isLoadingAllValidators,
            refetch: handleRefetch,
        };
    }, [validators, allValidators]);

    return { stakingValidators, isIdle, isLoading, refetch: handleRefetch };
}
