import { ReactNode } from "react";
import { Col, Typography } from "@peersyst/react-native-components";

export interface TransactionDetailProps {
    title: string;
    children?: ReactNode;
}

const TransactionDetail = ({ title, children }: TransactionDetailProps): JSX.Element => (
    <Col gap={5}>
        <Typography variant="h3" fontWeight="bold">
            {title}
        </Typography>
        {children}
    </Col>
);

export default TransactionDetail;
