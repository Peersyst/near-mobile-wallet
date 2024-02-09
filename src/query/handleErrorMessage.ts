import { en } from "locale/locales/en/en";
import { ApiError } from "refactor/data-access/api/service";
import { TFunction } from "react-i18next";

export interface HandleApiErrorMessageResult {
    message: string;
    type: "error" | "warning";
}

export type UseHandleErrorMessage = (error: ApiError | any) => HandleApiErrorMessageResult;

export function handleErrorMessage(error: ApiError | any, translate: TFunction<"error", undefined>): HandleApiErrorMessageResult {
    const code = error.body?.statusCode || error.status;
    const message = error.body?.message || error.statusText;
    if (!code || code === 500) return { message: translate("somethingWentWrong"), type: "error" };
    else if (code === 401) return { message: translate("sessionExpired"), type: "warning" };
    else return { message: translate(message in en.error ? error.body.message : "somethingWentWrong"), type: "error" };
}
