import { Row, Typography } from "react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";
import useWallet from "module/wallet/hook/useWallet";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";

export interface WalletItemProps {
    index: number;
    color?: string;
}

const WalletItem = ({ index, color = "#000000" }: WalletItemProps): JSX.Element => {
    const { name } = useWallet(index);
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(index);

    return (
        <Row alignItems="center" style={{ overflow: "hidden" }}>
            <Typography numberOfLines={1} variant="body1" fontWeight="bold" style={{ color, maxWidth: "60%" }}>
                {name}
            </Typography>
            <Row>
                <Typography variant="body1" style={{ color }}>
                    {" - "}
                </Typography>
                <ControlledSuspense isLoading={balanceIsLoading} color={color}>
                    <Balance balance={balance?.freeBalance || 0} units={"CKB"} variant="body1" boldUnits style={{ color }} />
                </ControlledSuspense>
            </Row>
        </Row>
    );
};

export default WalletItem;
