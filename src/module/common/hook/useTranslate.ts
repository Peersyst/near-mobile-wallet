import { FallbackNs, useTranslation, UseTranslationOptions, UseTranslationResponse } from "react-i18next";
import { KeyPrefix, FlatNamespace } from "i18next";
import { $Tuple } from "react-i18next/helpers";

export default function useTranslate<
    Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
    TKPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(ns?: Ns | Readonly<Ns>, options?: UseTranslationOptions<TKPrefix>): UseTranslationResponse<FallbackNs<Ns>, TKPrefix>["t"] {
    return useTranslation<Ns, TKPrefix>(ns, options).t;
}
