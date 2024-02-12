import { Col, Row, Typography, useTranslate } from "@peersyst/react-native-components";
import DotList from "../DotList/DotList";
import StatusIcon from "../StatusIcon/StatusIcons";
import { GuidelinesListProps } from "./GuidelinesList.types";

const GuidelinesList = ({ children, allowed }: GuidelinesListProps) => {
    const translate = useTranslate();
    return (
        <Col>
            <Row gap={8}>
                <StatusIcon status={allowed ? "valid" : "invalid"} />
                <Typography variant="body3Strong">{translate(allowed ? "you_can_use" : "you_cant_use") + " :"}</Typography>
            </Row>
            <DotList style={{ marginLeft: "10%" }}>{children}</DotList>
        </Col>
    );
};

export default GuidelinesList;
