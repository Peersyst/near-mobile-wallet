import { ApiError } from "module/api/service";
import { translate } from "locale";
import en from "../locale/en.json";

export interface HandleApiErrorMessageResult {
    message: string;
    type: "error" | "warning";
}

export function handleErrorMessage(error: ApiError | any): HandleApiErrorMessageResult {
    const code = error.body?.statusCode || error.status;
    const message = error.body?.message || error.statusText;
    if (!code || code === 500) return { message: translate("somethingWentWrong"), type: "error" };
    else if (code === 401) return { message: translate("sessionExpired"), type: "warning" };
    else return { message: translate(message in en ? error.body.message : "somethingWentWrong"), type: "error" };
}
