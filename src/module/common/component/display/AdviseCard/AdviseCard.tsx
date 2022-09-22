import { AdviseCardProps } from "module/common/component/display/AdviseCard/AdviseCard.types";
import { Col, Row, Typography } from "@peersyst/react-native-components";
import CountdownButton from "../../input/CountdownButton/CountdownButton";
import { AdviseCardRoot, BackIconButton } from "./AdviseCard.styles";
import { BackIcon } from "icons";
import { useTranslate } from "module/common/hook/useTranslate";

const AdviseCard = ({ number, totalAdvises, title, text, style, onBack, onNext, timer = 5 }: AdviseCardProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <AdviseCardRoot style={{ ...style }}>
            <Col flex={1} justifyContent="space-between">
                <Col gap="2%">
                    <Typography variant="h3" textTransform="uppercase" textAlign="center" fontWeight="700">
                        {title || translate("advise") + " " + number}
                    </Typography>
                    {totalAdvises && (
                        <Typography variant="body2" textAlign="center">
                            {number + "/" + totalAdvises}
                        </Typography>
                    )}
                </Col>
                <Typography variant="body2" style={{ marginTop: 5, textAlign: "justify" }}>
                    {text}
                </Typography>
                <Row justifyContent={onBack ? "space-between" : "flex-end"} alignItems="center" style={{ height: 60 }}>
                    {onBack && (
                        <BackIconButton onPress={onBack}>
                            <BackIcon />
                        </BackIconButton>
                    )}
                    {onNext && (
                        <CountdownButton style={{ width: 150, marginTop: 5 }} seconds={timer} onPress={onNext}>
                            {translate("next")}
                        </CountdownButton>
                    )}
                </Row>
            </Col>
        </AdviseCardRoot>
    );
};

export default AdviseCard;
