import { Col, ColProps } from "@peersyst/react-native-components";
import { ViewStyle } from "react-native";
import Typography from "../Typography/Typography";

export interface AdviseProps {
    title?: string;
    text?: string;
    gap?: ColProps["gap"];
    style?: ViewStyle;
}

const Advise = ({ title, text, style, gap }: AdviseProps): JSX.Element => (
    <Col alignItems="center" style={style} gap={gap ?? 24}>
        <Typography variant="body3Strong" textAlign="center">
            {title}
        </Typography>
        {text && (
            <Typography variant="body3Regular" textAlign="center" color={(palette) => palette.overlay["60%"]}>
                {text}
            </Typography>
        )}
    </Col>
);

export default Advise;
