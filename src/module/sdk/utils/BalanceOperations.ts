import { convertNearToYocto, convertYoctoToNear } from "./near.utils";

export class BalanceOperations {
    // Big number operations
    static BNToString(bn: string): string {
        return BigInt(bn).toString();
    }
    static BNExp(base: number, exponent: number): string {
        let result = BigInt(1);
        let baseBigInt = BigInt(base);
        let exp = BigInt(exponent);

        while (exp > BigInt(0)) {
            if (exp % BigInt(2) === BigInt(1)) {
                result *= baseBigInt;
            }
            exp /= BigInt(2);
            baseBigInt *= baseBigInt;
        }

        return result.toString();
    }

    static BNIsBigger(a: string, b: string): boolean {
        return BigInt(a) > BigInt(b);
    }
    static BNIsBiggerOrEqual(a: string, b: string): boolean {
        return BigInt(a) >= BigInt(b);
    }
    static BNDivide(a: string, b: string): string {
        const numerator = BigInt(a);
        const denominator = BigInt(b);
        return (numerator / denominator).toString();
    }
    static BNMultiply(a: string, b: string): string {
        return (BigInt(a) * BigInt(b)).toString();
    }
    static BNSubtract(a: string, b: string): string {
        return (BigInt(a) - BigInt(b)).toString();
    }
    static BNAdd(a: string, b: string): string {
        return (BigInt(a) + BigInt(b)).toString();
    }

    // Number operations
    /**
     * Params must be in nears
     */
    static isBigger(a: string | number, b: string | number): boolean {
        const finalA = convertNearToYocto(a.toString());
        const finalB = convertNearToYocto(b.toString());
        return BigInt(finalA) > BigInt(finalB);
    }

    /**
     * Params must be in nears
     */
    static add(a: string | number, b: string | number): string {
        try {
            const finalA = convertNearToYocto(a.toString());
            const finalB = convertNearToYocto(b.toString());
            const res = BigInt(finalA) + BigInt(finalB);
            return convertYoctoToNear(res.toString());
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Error adding", a, b, e);
            return "0";
        }
    }

    /**
     * Params a, b must be in nears.
     * Max sensibility is 1 * 10^-24
     */
    static multiply(a: string | number, b: string | number): string {
        try {
            const finalA = convertNearToYocto(a.toString());
            const finalB = convertNearToYocto(b.toString());
            const bigRes = BigInt(finalA) * BigInt(finalB);
            const res = bigRes / BigInt(convertNearToYocto("1"));
            return convertYoctoToNear(res.toString());
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Error multiplying", a, b, e);
            return "0";
        }
    }
}
