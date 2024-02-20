import MnemonicErrorCodes from "../wallet/errors/MnemonicErrorCodes";
import PinErrorCodes from "../auth/errors/PinErrorCodes";

export enum GenericErrorCodes {
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

// Merge all module error codes here
const DomainErrorCodes = {
    ...GenericErrorCodes,
    ...PinErrorCodes,
    ...MnemonicErrorCodes,
};

export type DomainErrorCode = keyof typeof DomainErrorCodes;

export default DomainErrorCodes;
