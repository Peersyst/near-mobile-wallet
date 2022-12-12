import useGetBalance from "module/wallet/query/useGetBalance";
import Balance from "../Balance/Balance";
import { BalanceProps } from "../Balance/Balance.types";

export interface AccountBalanceProps extends Omit<BalanceProps, "balance"> {
    index: number;
}

const AccountBalance = ({ index, ...rest }: AccountBalanceProps) => {
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(index);
    return <Balance {...rest} balance={available} isLoading={isLoading} />;
};

export default AccountBalance;
