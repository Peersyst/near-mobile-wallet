import { isNEARAmountGreaterOrEqualThanThreshold } from "near-peersyst-sdk";
import useGetBalance from "./useGetBalance";

export interface UseCanPayNearAmountParams {
    amount: string; //In NEAR
    walletIndex?: number;
}

export default function useCanPayNearAmount({ walletIndex, amount }: UseCanPayNearAmountParams): boolean {
    const { data: { available } = { available: "0" } } = useGetBalance(walletIndex);
    return isNEARAmountGreaterOrEqualThanThreshold(available, amount);
}
