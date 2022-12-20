import { Row, Typography, Suspense } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";
import useWallet from "module/wallet/hook/useWallet";

export interface WalletItemProps {
    index: number;
}

const WalletItem = ({ index }: WalletItemProps): JSX.Element => {
    const { account } = useWallet(index);
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(index);

    return (
        <Row alignItems="center" style={{ overflow: "hidden" }}>
            <Typography numberOfLines={1} variant="body2Strong" style={{ maxWidth: "60%" }}>
                {account}
            </Typography>
            <Row>
                <Typography variant="body2Strong">{" · "}</Typography>
                <Suspense isLoading={balanceIsLoading} activityIndicatorSize="small">
                    <Balance balance={balance?.available || 0} variant="body2Strong" light />
                </Suspense>
            </Row>
        </Row>
    );
};

export default WalletItem;
