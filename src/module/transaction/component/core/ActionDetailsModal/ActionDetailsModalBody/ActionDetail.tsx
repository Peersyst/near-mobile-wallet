import { ReactNode } from "react";
import { Col, Typography } from "@peersyst/react-native-components";

export interface ActionDetailProps {
    title: string;
    children?: ReactNode;
}

const ActionDetail = ({ title, children }: ActionDetailProps): JSX.Element => (
    <Col>
        <Typography variant="body3Strong" light>
            {title}
        </Typography>
        {children}
    </Col>
);

export default ActionDetail;
