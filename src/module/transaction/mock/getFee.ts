export default function (feeType: string): Promise<string> {
    return new Promise((resolve) =>
        setTimeout(() => {
            if (feeType === "slow") resolve("5");
            else if (feeType === "average") resolve("10");
            else resolve("20");
        }, 1000),
    );
}
