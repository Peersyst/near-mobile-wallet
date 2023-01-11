import { convertNearToYocto, convertYoctoToNear } from "./near.utils";
const BN = require("bn.js");

export class BalanceOperations {
    //Big number operations
    static BNToString(bn: string): string {
        return new BN(bn).toString();
    }
    static BNExp(base: number, exponent: number): string {
        return new BN(base).pow(new BN(exponent)).toString();
    }
    static BNIsBigger(a: string, b: string): boolean {
        return new BN(a).gt(new BN(b));
    }
    static BNDevide(a: string, b: string): string {
        const numerator = BigInt(a);
        const denominator = BigInt(b);
        return (numerator / denominator).toString();
    }
    static BNMultiply(a: string, b: string): string {
        return new BN(a).mul(new BN(b)).toString();
    }
    static BNSubtract(a: string, b: string): string {
        return new BN(a).sub(new BN(b)).toString();
    }

    // Number operations
    /**
     * Params must be in nears
     */
    static isBigger(a: string | number, b: string | number): boolean {
        const finalA = convertNearToYocto(a.toString());
        const finalB = convertNearToYocto(b.toString());
        return new BN(finalA).gt(new BN(finalB));
    }

    /**
     * Params must be in nears
     */
    static add(a: string | number, b: string | number, returnBN = false): string {
        try {
            const finalA = convertNearToYocto(a.toString());
            const finalB = convertNearToYocto(b.toString());
            const res = new BN(finalA).add(new BN(finalB));
            if (returnBN) return res;
            else {
                return convertYoctoToNear(res).toString();
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Error adding", a, b, e);
            return "0";
        }
    }
}
