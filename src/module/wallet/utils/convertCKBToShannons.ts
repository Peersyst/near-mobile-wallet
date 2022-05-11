export function convertCKBToShannons(num: string | number) {
    return BigInt(Math.round(Number(num) * 10 ** 8));
}
