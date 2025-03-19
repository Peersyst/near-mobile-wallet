import { en } from "locale/locales/en/en";
import { ApiError } from "module/api/service";
import { TFunction } from "i18next";

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
    else if (error instanceof Error) {
        const stringifiedError = error.toString();
        if (stringifiedError.includes("cover storage")) {
            return {
                message: translate("notEnoughBalanceForStorage"),
                type: "error",
            };
        } else if (stringifiedError.includes("enough balance")) {
            return {
                message: translate("notEnoughBalance"),
                type: "error",
            };
        } else {
            return {
                message: translate("somethingWentWrong"),
                type: "error",
            };
        }
    } else return { message: translate(message in en.error ? error.body.message : "somethingWentWrong"), type: "error" };
}
