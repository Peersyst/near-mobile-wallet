import { Row, Selector } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";

export interface AccountSelectorProps {
    index: number;
    account: string;
}

const AccountSelector = ({ index, account }: AccountSelectorProps) => {
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(index);
    return (
        <Row alignItems="center" justifyContent="space-between" style={{ maxWidth: "100%", width: "100%" }}>
            <Selector value={index} label={account} />
            <Balance
                style={{ width: "30%" }}
                balance={available}
                options={{ maximumFractionDigits: 2 }}
                key={index}
                textAlign="right"
                variant="body3Strong"
                units="token"
                light
                isLoading={isLoading}
            />
        </Row>
    );
};

export default AccountSelector;
