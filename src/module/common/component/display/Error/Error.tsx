import { Col } from "@peersyst/react-native-components";
import Typography from "../Typography/Typography";
import { ErrorIcon, ErrorText } from "./Error.styles";

export interface ErrorProps {
    title: string;
    description: string;
}

const Error = ({ title, description }: ErrorProps): JSX.Element => {
    return (
        <Col flex={1} gap={8} alignItems="center" justifyContent="center">
            <ErrorIcon size={72} />
            <Col gap={4}>
                <Typography variant="h4Strong" textAlign="center">
                    {title}
                </Typography>
                <ErrorText variant="body2Strong" textAlign="center">
                    {description}
                </ErrorText>
            </Col>
        </Col>
    );
};

export default Error;
