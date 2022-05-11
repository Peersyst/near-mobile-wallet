export function convertCKBToMini(num: string | number) {
    return BigInt(Math.round(Number(num) * 10 ** 8));
}
