import { useDebounce } from "@peersyst/react-hooks";
import { Validator } from "near-peersyst-sdk";
import { useEffect, useState } from "react";

export interface UseFilterValidatorsReturn {
    accountId: string;
    setAccountId: (value: string) => void;
    queryValidators: Validator[];
    isPending: boolean;
}

const QUERY_FILTER_DEBOUNCE = 250;

export default function useStakingValidatorController(validators: Validator[]) {
    const {
        value: accountId,
        handleChange: setAccountId,
        debouncedValue: query,
        debouncing,
    } = useDebounce("", { delay: QUERY_FILTER_DEBOUNCE });

    const [queryValidators, setQueryValidators] = useState<Validator[]>(validators); //Final array of validators (filtered)

    const [isFiltering, setIsFiltering] = useState<boolean>(false);

    const handleChange = (value: string) => {
        setIsFiltering(true);
        setAccountId(value);
    };

    useEffect(() => {
        if (query !== "") {
            const searchReg = new RegExp(query, "i");
            const finalValidators = validators.filter((item) => searchReg.test(item.accountId));
            setQueryValidators(finalValidators);
        } else {
            setQueryValidators(validators);
        }
        setIsFiltering(false);
    }, [query, validators]);

    return {
        accountId,
        setAccountId: handleChange,
        queryValidators,
        isPending: isFiltering || debouncing,
    };
}
