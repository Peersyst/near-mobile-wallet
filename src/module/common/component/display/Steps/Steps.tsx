import { Row, Typography } from "@peersyst/react-native-components";

export interface StepsProps {
    index: number;
    length: number;
}

const Steps = ({ index, length }: StepsProps): JSX.Element => (
    <Row>
        <Typography variant="body3Strong">{index + 1} </Typography>
        <Typography variant="body3Regular">/</Typography>
        <Typography variant="body3Regular" light>
            {` ${length}`}
        </Typography>
    </Row>
);

export default Steps;
