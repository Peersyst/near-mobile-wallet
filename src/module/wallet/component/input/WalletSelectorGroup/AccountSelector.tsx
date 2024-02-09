import { Row, Selector } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";
import { BalanceOperations } from "near-peersyst-sdk";
import { config } from "refactor/common/config";
import { formatHash } from "@peersyst/react-utils";

export interface AccountSelectorProps {
    index: number;
    account: string;
}

const AccountSelector = ({ index, account }: AccountSelectorProps) => {
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(index);
    const decimals = BalanceOperations.isBigger(available, config.minBalanceToCreateAccount) ? 1 : 3;
    return (
        <Row alignItems="center" justifyContent="space-between" style={{ maxWidth: "100%", width: "100%" }}>
            <Row style={{ width: "75%", overflow: "hidden" }}>
                <Selector value={index} label={formatHash(account, "middle", 11)} />
            </Row>
            <Balance
                style={{ width: "20%" }}
                balance={available}
                options={{ maximumFractionDigits: decimals, minimumFractionDigits: decimals }}
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
