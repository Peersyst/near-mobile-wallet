import { Col } from "@peersyst/react-native-components";
import Typography from "../Typography/Typography";
import { DotListProps } from "./DotList.types";

const DotList = ({ gap = 0, children, ...rest }: DotListProps) => {
    const { variant = "body3Regular", light = true, ...typographyProps } = rest;
    return (
        <Col gap={gap}>
            {children.map((child, index) => (
                <Typography key={index} variant={variant} light={light} {...typographyProps}>
                    {"• " + child}
                </Typography>
            ))}
        </Col>
    );
};

export default DotList;
