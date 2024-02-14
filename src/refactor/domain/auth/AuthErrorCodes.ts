export enum AuthErrorCodes {
    SESSION_EXPIRED = "SESSION_EXPIRED",
    ADDRESS_NOT_FOUND = "ADDRESS_NOT_FOUND",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    TOKEN_INVALID = "TOKEN_INVALID",
    INVALID_PASSWORD = "INVALID_PASSWORD",
    USER_INFO_NOT_INITIALIZED = "USER_INFO_NOT_INITIALIZED",
    PIN_IS_NOT_SET = "PIN_IS_NOT_SET",
    MNEMONIC_DOES_NOT_CORRESPOND_TO_ADDRESS = "MNEMONIC_DOES_NOT_CORRESPOND_TO_ADDRESS",
    MNEMONIC_IS_NOT_SET = "MNEMONIC_IS_NOT_SET",
    MNEMONIC_IS_INVALID = "MNEMONIC_IS_INVALID",
    PIN_IS_INVALID = "PIN_IS_INVALID",
}

export default AuthErrorCodes;
