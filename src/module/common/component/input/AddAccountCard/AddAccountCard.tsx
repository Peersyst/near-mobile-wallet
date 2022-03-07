import { AdviseCardProps } from "module/common/component/display/AdviseCard/AdviseCard.types";
import { Col, Typography } from "react-native-components";
import AccountCard from "../../surface/AccountCard/AccountCard";

const AddAccountCard = ({ text = "hola" }: AdviseCardProps): JSX.Element => {
    return (
        <AccountCard>
            <Col flex={1} justifyContent="space-between">
                <Typography variant="body2">{text}</Typography>
            </Col>
        </AccountCard>
    );
};

export default AddAccountCard;
