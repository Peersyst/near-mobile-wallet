function isCientificNotation(num: string | number) {
    return num.toString().includes("e") || num.toString().includes("E");
}

/**
 * Converts a number in cientific notation to a string representation
 * Example: 1.23e-3 => 0.00123
 * @returns
 */
function parseCientificNotation(num: string | number) {
    const [base, exp] = num.toString().split(/[eE]/);
    const isNegative = num.toString()[0] === "-";
    const finalBase = base.replace(/-|,/g, "");

    //TODO: Add support for numbers like 1323.3e-3
    if (finalBase.split(".")[0].length > 1) {
        throw new TypeError("Invalid cientific notation");
    }

    const tempAmount = finalBase.replace(".", "");
    const finalExpo = Math.abs(Number(exp));

    if (exp[0] !== "-") {
        return tempAmount.padEnd(finalExpo + 1, "0");
    } else {
        const prefix = isNegative ? "-" : "";
        return prefix + "0." + "0".repeat(finalExpo - 1) + tempAmount;
    }
}

export function stringifyNumber(num: string | number): string {
    if (isCientificNotation(num)) {
        return parseCientificNotation(num);
    }
    return num.toString();
}
