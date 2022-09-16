import { NameSpacesType } from "newLocale/i18n.types";
import { KeyPrefix, Namespace, useTranslation, UseTranslationOptions, UseTranslationResponse } from "react-i18next";

export function useTranslate<N extends Namespace = NameSpacesType, TKPrefix extends KeyPrefix<N> = undefined>(
    ns?: N | Readonly<N>,
    options?: UseTranslationOptions<TKPrefix>,
): UseTranslationResponse<N, TKPrefix>["t"] {
    return useTranslation<N, TKPrefix>(ns, options).t;
}
