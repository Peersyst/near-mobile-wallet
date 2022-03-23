import { Col, Typography } from "react-native-components";

interface EmptyListComponentProps {
    message: string;
}

const EmptyListComponent = ({ message }: EmptyListComponentProps): JSX.Element => {
    return (
        <Col alignItems="center">
            <Typography variant="body1">{message}</Typography>
        </Col>
    );
};

export default EmptyListComponent;
