import { convertNearToYocto, convertYoctoToNear } from "./near.utils";
import BigNumber from "bignumber.js";
import BN from "bn.js";

export class BalanceOperations {
    //Big number operations
    static BNToString(bn: string): string {
        return BigNumber(bn).toString();
    }
    static BNExp(base: number, exponent: number): string {
        return new BigNumber(base).pow(BigNumber(exponent)).toString();
    }
    static BNIsBigger(a: string, b: string): boolean {
        return BigNumber(a).gt(BigNumber(b));
    }
    static BNIsBiggerOrEqual(a: string, b: string): boolean {
        return BigNumber(a).gte(BigNumber(b));
    }
    static BNDivide(a: string, b: string): string {
        return BigNumber(a).dividedBy(BigNumber(b)).toString();
    }
    static BNMultiply(a: string, b: string): string {
        return BigNumber(a).multipliedBy(BigNumber(b)).toString();
    }
    static BNSubtract(a: string, b: string): string {
        return BigNumber(a).minus(BigNumber(b)).toString();
    }
    static BNAdd(a: string, b: string): string {
        return BigNumber(a).plus(BigNumber(b)).toString();
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
    static add(a: string | number, b: string | number): string {
        try {
            const finalA = convertNearToYocto(a.toString());
            const finalB = convertNearToYocto(b.toString());
            const res = new BN(finalA).add(new BN(finalB)).toString();
            return convertYoctoToNear(res).toString();
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
            const bigRes = new BN(finalA).mul(new BN(finalB));
            //We need to divide because if we convert the amount to yoctos, the exponents will be added
            // 3 near = 3 * 10^24 yoctos
            // 3 near = 3 * 10^24 yoctos
            // 3 * 3 * 10^(24 + 24) = 9 * 10 ^ 48  yoctos
            // 9 * 10^48 yoctos / 1 * 10^24 = 9 * 10^(48 - 24) = 9 * 10^24 near
            const res = bigRes.div(new BN(convertNearToYocto("1"))).toString();
            return convertYoctoToNear(res).toString();
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Error multiplying", a, b, e);
            return "0";
        }
    }
}
