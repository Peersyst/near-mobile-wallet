import { en } from "locale/locales/en/en";
import { ApiError } from "module/api/service";
import { useTranslate } from "module/common/hook/useTranslate";

export interface HandleApiErrorMessageResult {
    message: string;
    type: "error" | "warning";
}

export type UseHandleErrorMessage = (error: ApiError | any) => HandleApiErrorMessageResult;

export function useHandleErrorMessage(): UseHandleErrorMessage {
    const handleErrorMessage = (error: ApiError | any): HandleApiErrorMessageResult => {
        const translate = useTranslate("error");
        const code = error.body?.statusCode || error.status;
        const message = error.body?.message || error.statusText;
        if (!code || code === 500) return { message: translate("somethingWentWrong"), type: "error" };
        else if (code === 401) return { message: translate("sessionExpired"), type: "warning" };
        else return { message: translate(message in en.error ? error.body.message : "somethingWentWrong"), type: "error" };
    };
    return handleErrorMessage;
}
