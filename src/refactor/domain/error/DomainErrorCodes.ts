import PinErrorCodes from "../auth/pin/PinErrorCodes";
import AuthErrorCodes from "../auth/AuthErrorCodes";
import WalletErrorCodes from "../wallet/errors/WalletErrorCodes";

export enum GenericErrorCodes {
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

// Merge all module error codes here
const DomainErrorCodes = {
    ...GenericErrorCodes,
    ...PinErrorCodes,
    ...WalletErrorCodes,
    ...AuthErrorCodes,
};

export type DomainErrorCode = keyof typeof DomainErrorCodes;

export default DomainErrorCodes;
