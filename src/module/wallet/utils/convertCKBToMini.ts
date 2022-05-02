export function convertCKBToMini(num: bigint | string | number) {
    return BigInt(Number(num) * 10 ** 8);
}
