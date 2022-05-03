export function convertMiniToCKB(num: bigint | string | number) {
    return Number(num) / 10 ** 8;
}
