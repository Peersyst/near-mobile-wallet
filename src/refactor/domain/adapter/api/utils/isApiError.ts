import { IApiError } from "../IApiError";

export default function isApiError(error: any): error is IApiError {
    return (
        error instanceof Error &&
        !!(error as any).body &&
        typeof (error as any).body.statusCode === "number" &&
        typeof (error as any).body.message === "string"
    );
}
