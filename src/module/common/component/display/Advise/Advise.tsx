import { Col } from "@peersyst/react-native-components";
import { ViewStyle } from "react-native";
import Typography from "../Typography/Typography";

export interface AdviseProps {
    title: string;
    text: string;
    style?: ViewStyle;
}

const Advise = ({ title, text, style }: AdviseProps): JSX.Element => (
    <Col alignItems="center" style={style}>
        <Typography variant="body3Strong" textAlign="center">
            {title}
        </Typography>
        <Typography variant="body3Regular" textAlign="center" color={(palette) => palette.overlay["60%"]}>
            {text}
        </Typography>
    </Col>
);

export default Advise;
