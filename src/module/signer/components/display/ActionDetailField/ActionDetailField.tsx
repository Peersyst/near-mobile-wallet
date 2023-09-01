import { Col, Row } from "@peersyst/react-native-components";
import { ActionDetailContent, ActionDetailIcon } from "./ActionDetailField.styles";
import { ActionDetailFieldProps } from "./ActionDetailField.types";
import Typography from "module/common/component/display/Typography/Typography";

const ActionDetailField = ({ label, content: contentProp = "", description, LeftIcon, RightIcon }: ActionDetailFieldProps): JSX.Element => {
    const content =
        typeof contentProp === "object" ? (
            contentProp
        ) : (
            <Typography variant="body2Strong" numberOfLines={1}>
                {contentProp}
            </Typography>
        );

    return (
        <Col gap={4} style={{ width: "100%" }}>
            <Row alignItems="center" gap={8}>
                {LeftIcon && (
                    <ActionDetailIcon>
                        <LeftIcon />
                    </ActionDetailIcon>
                )}
                <Typography variant="body2Strong" numberOfLines={1} style={{ flex: 1 }}>
                    {label}
                </Typography>
                {content && <ActionDetailContent>{content}</ActionDetailContent>}
                {RightIcon && (
                    <ActionDetailIcon>
                        <RightIcon />
                    </ActionDetailIcon>
                )}
            </Row>
            {description && (
                <Typography variant="body3Regular" style={{ paddingLeft: LeftIcon ? 36 : 0 }} light>
                    {description}
                </Typography>
            )}
        </Col>
    );
};

export default ActionDetailField;
