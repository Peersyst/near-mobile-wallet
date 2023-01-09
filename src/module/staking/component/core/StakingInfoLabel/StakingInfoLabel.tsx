import Typography from "module/common/component/display/Typography/Typography";
import { Col } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";

interface StakingInfoLabelProps {
    amount: number | undefined;
    label: string | undefined;
    loading: boolean;
}

const StakingInfoLabel = ({ loading, amount, label }: StakingInfoLabelProps): JSX.Element => {
    return (
        <Col flex={1} justifyContent="center" style={{ width: "50%" }}>
            <Balance textAlign="center" isLoading={loading} balance={amount ?? 0} variant="h4Strong" style={{ width: "100%" }} />
            <Typography textAlign="center" variant="body3Strong" light>
                {label}
            </Typography>
        </Col>
    );
};

export default StakingInfoLabel;
