import { Col, ColProps } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { OrderIconSuccess } from "./OrderSuccess.styles";

export interface OrderSuccessProps {
    style?: ColProps["style"];
    title: string;
    subtitle?: string;
}

const OrderSuccess = ({ style, title, subtitle }: OrderSuccessProps) => {
    return (
        <Col alignItems="center" gap={14} style={style} justifyContent="center">
            <OrderIconSuccess />
            <Col gap={4}>
                <Typography variant="h4Strong" textAlign="center">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body2Strong" light textAlign="center">
                        {subtitle}
                    </Typography>
                )}
            </Col>
        </Col>
    );
};

export default OrderSuccess;
