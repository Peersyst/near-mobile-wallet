import { convertNearToYocto, convertYoctoToNear } from "./near.utils";
const BigInt = require("bn.js");

export class MathOperations {
    static isBigger(a: string | number, b: string | number): boolean {
        const finalA = convertNearToYocto(a.toString());
        const finalB = convertNearToYocto(b.toString());
        return new BigInt(finalA).gt(new BigInt(finalB));
    }

    static add(a: string | number, b: string | number, returnBigInt = false): string {
        try {
            const finalA = convertNearToYocto(a.toString());
            const finalB = convertNearToYocto(b.toString());
            const res = new BigInt(finalA).add(new BigInt(finalB));
            if (returnBigInt) return res;
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
