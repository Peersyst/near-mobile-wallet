export function convertShannonsToCKB(num: string | number) {
    return BigInt(Number(num) * 10 ** 8);
}
