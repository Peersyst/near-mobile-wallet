export function convertCKBToShannons(num: string | number) {
    return BigInt(Number(num) * 10 ** 8);
}
