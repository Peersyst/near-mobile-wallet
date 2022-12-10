import { Col, Row, Typography, useTheme } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import DotList from "../DotList/DotList";
import { InvalidIcon, ValidIcon } from "./ExplanationList.style";
import { ExplanationListProps } from "./ExplanationList.types";

const ExplanationList = ({ children, allowed }: ExplanationListProps) => {
    const translate = useTranslate();
    const {
        icons: { invalid: Invalid, valid: Valid },
    } = useTheme();
    const Icon = allowed ? ValidIcon : InvalidIcon;
    return (
        <Col>
            <Row gap={8}>
                <Icon>{allowed ? <Valid /> : <Invalid />}</Icon>
                <Typography variant="body3Strong">{translate(allowed ? "you_can_use" : "you_cant_use") + " :"}</Typography>
            </Row>
            <DotList style={{ marginLeft: "10%" }}>{children}</DotList>
        </Col>
    );
};

export default ExplanationList;
