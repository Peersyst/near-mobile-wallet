import { AnyObject } from "@peersyst/react-types";
import { ServiceErrorCode } from "./ServiceErrorCodes";

export default class ServiceError extends Error {
    code: ServiceErrorCode;
    data?: AnyObject;

    constructor(code: ServiceErrorCode, data?: AnyObject) {
        super(code);

        this.name = "ServiceError";
        this.code = code;
        this.data = data;
    }
}
