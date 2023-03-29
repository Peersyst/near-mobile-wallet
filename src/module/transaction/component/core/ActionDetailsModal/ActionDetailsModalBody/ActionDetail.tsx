import { ReactNode } from "react";
import { Col, Typography } from "@peersyst/react-native-components";

export interface ActionDetailProps {
    title: string;
    children?: ReactNode;
}

const ActionDetail = ({ title, children }: ActionDetailProps): JSX.Element => (
    <Col gap={5}>
        <Typography variant="body2Strong">{title}</Typography>
        {children}
    </Col>
);

export default ActionDetail;
