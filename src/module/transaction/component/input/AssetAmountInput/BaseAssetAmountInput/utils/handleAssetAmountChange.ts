export interface HandleAssetAmountChange {
    amount: string;
    setAmount: (value: string) => void;
    decimals: number;
}

export const handleAssetAmountChange = ({ amount, setAmount, decimals: decimalsParams }: HandleAssetAmountChange): void => {
    const [int, decimals] = amount.split(".");
    if (decimals) {
        setAmount(`${int}.${decimals.slice(0, Number(decimalsParams))}`);
    } else {
        setAmount(amount);
    }
};
