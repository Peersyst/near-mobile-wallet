import { Validator } from "near-peersyst-sdk";
import { startTransition, useEffect, useState } from "react";

export interface UseFilterValidatorsReturn {
    accountId: string;
    setAccountId: (value: string) => void;
    queryValidators: Validator[];
}

export default function useStakingValidatorController(validators: Validator[]) {
    const [accountId, setAccountId] = useState("");
    const [query, setQuery] = useState(accountId);
    const [queryValidators, setQueryValidators] = useState<Validator[]>(validators);

    const handleChange = (value: string) => {
        setAccountId(value);
        startTransition(() => {
            setQuery(value);
        });
    };

    useEffect(() => {
        if (query !== "") {
            const searchReg = new RegExp(query, "i");
            const finalValidators = validators.filter((item) => searchReg.test(item.accountId));
            setQueryValidators(finalValidators);
        } else {
            setQueryValidators(validators);
        }
    }, [query, validators]);

    return {
        accountId,
        setAccountId: handleChange,
        queryValidators,
    };
}
