interface FormatPublicKeyOptions {
    digits?: number;
}

export const formatPublicKey = (publicKey: string, options: FormatPublicKeyOptions = {}) => {
    const { digits } = options;

    const formatted = publicKey.replace("ed25519:", "");
    return digits ? `${formatted.slice(0, digits)}...` : formatted;
};
