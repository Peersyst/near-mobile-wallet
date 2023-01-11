import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";

export default function useNativeTokenPrice(contractId: string) {
    const { data = {} } = useGetTokenPrice();
    let price = 0;
    const tokensKeys = Object.keys(data);
    const tokensValues = Object.values(data);
    const token = tokensValues[tokensKeys.indexOf(contractId)];
    if (token) {
        price = Object.values(token)[0];
    }
    return { data: price };
}
