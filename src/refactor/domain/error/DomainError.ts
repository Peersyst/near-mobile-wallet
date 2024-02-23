import isApiError from "../adapter/api/utils/isApiError";
import DomainErrorCodes, { DomainErrorCode } from "./DomainErrorCodes";
import { AnyObject } from "@peersyst/react-types";

export type DomainErrorSeverity = "error" | "warning";

export default class DomainError extends Error {
    code: DomainErrorCode;
    severity: DomainErrorSeverity;
    data?: AnyObject;

    constructor(code: DomainErrorCode, severity: DomainErrorSeverity = "error", data?: AnyObject) {
        super(code);

        this.name = "DomainError";
        this.code = code;
        this.severity = severity;
        this.data = data;
    }

    /**
     * Creates a DomainError from an ApiError
     * @param error Any error
     * @param handlers Handlers for especific ApiError codes coming from the backend. If no handler is provided for a code, the error will be UNKNOWN_ERROR
     * @returns The corresponding DomainError
     */
    static fromApiError(error: any, handlers: Record<string, DomainErrorCode | [DomainErrorCode, DomainErrorSeverity]> = {}): DomainError {
        if (isApiError(error)) {
            const errorBodyMessage = handlers[error.body.message];
            const [errorCode, errorSeverity] = Array.isArray(errorBodyMessage) ? errorBodyMessage : [errorBodyMessage, "error" as const];
            return new DomainError(DomainErrorCodes[errorCode] || DomainErrorCodes.UNKNOWN_ERROR, errorSeverity);
        }
        return new DomainError(DomainErrorCodes.UNKNOWN_ERROR);
    }
}
