import { Row, Typography } from "react-native-components";
import { ActivityIndicator } from "react-native";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";

export interface AccountItemProps {
    address: string;
    name: string;
    color?: string;
}

const AccountItem = ({ address, name, color = "#000000" }: AccountItemProps): JSX.Element => {
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(address);

    return (
        <Row alignItems="center">
            <Typography variant="body1" fontWeight="bold" style={{ color }}>
                {name}
            </Typography>
            <Typography variant="body1" style={{ color }}>
                {" "}
                -{" "}
            </Typography>
            {balanceIsLoading ? (
                <ActivityIndicator color={color} />
            ) : (
                <Balance balance={balance!} units={"CKB"} variant="body1" boldUnits style={{ color }} />
            )}
        </Row>
    );
};

export default AccountItem;
