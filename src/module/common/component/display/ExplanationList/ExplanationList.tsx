import { Col, Row, Typography } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import DotList from "../DotList/DotList";
import StatusIcon from "../StatusIcon/StatusIcons";
import { ExplanationListProps } from "./ExplanationList.types";

const ExplanationList = ({ children, allowed }: ExplanationListProps) => {
    const translate = useTranslate();
    return (
        <Col>
            <Row gap={8}>
                <StatusIcon statusIcon={allowed ? "valid" : "invalid"} />
                <Typography variant="body3Strong">{translate(allowed ? "you_can_use" : "you_cant_use") + " :"}</Typography>
            </Row>
            <DotList style={{ marginLeft: "10%" }}>{children}</DotList>
        </Col>
    );
};

export default ExplanationList;
