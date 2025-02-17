/**
 * Add two balances in string format.
 * @param amount1 The first balance.
 * @param amount2 The second balance.
 * @returns The sum of the two balances.
 */
export function addBalances(amount1: string, amount2: string): string {
    return (BigInt(amount1) + BigInt(amount2)).toString();
}
