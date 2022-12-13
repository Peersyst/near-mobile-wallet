import { convertNearToYocto } from "near-peersyst-sdk";

export class WalletOperations {
    static isBigger(a: string | number, b: string | number) {
        const finalA = convertNearToYocto(a.toString());
        const finalB = convertNearToYocto(b.toString());
        return BigInt(finalA) > BigInt(finalB);
    }
}
