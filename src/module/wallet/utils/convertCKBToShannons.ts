export function convertCKBToShannons(num: bigint | string | number) {
    return (Number(num) / 10 ** 8).toFixed(0);
}
