import { Row, Typography } from "react-native-components";
import { ActivityIndicator } from "react-native";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";
import useWallet from "module/wallet/hook/useWallet";

export interface WalletItemProps {
    index: number;
    color?: string;
}

const WalletItem = ({ index, color = "#000000" }: WalletItemProps): JSX.Element => {
    const { name } = useWallet(index);
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(index);

    return (
        <Row alignItems="center" style={{ overflow: "hidden" }}>
            <Typography variant="body1" fontWeight="bold" style={{ color }}>
                {name}
            </Typography>
            <Typography variant="body1" style={{ color }}>
                {" - "}
            </Typography>
            {balanceIsLoading ? (
                <ActivityIndicator color={color} />
            ) : (
                <Balance balance={balance!.freeBalance} units={"CKB"} variant="body1" boldUnits style={{ color }} />
            )}
        </Row>
    );
};

export default WalletItem;
