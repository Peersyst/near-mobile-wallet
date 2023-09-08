import { Col, ScrollView } from "@peersyst/react-native-components";
import { ActionDetailsScaffoldProps } from "./ActionDetailsScaffold.types";
import Typography from "module/common/component/display/Typography/Typography";
import ActionPreview from "../../display/ActionPreview/ActionPreview";

const ActionDetailsScaffold = ({
    header,
    description,
    children,
    showPreview = false,
    previewProps,
    scrollable = false,
}: ActionDetailsScaffoldProps): JSX.Element => {
    return (
        <ScrollView scrollEnabled={scrollable}>
            <Col flex={1} gap={12} style={{ width: "100%" }}>
                <Col gap={4}>
                    {header && (
                        <Typography variant="body3Strong" textAlign="center">
                            {header}
                        </Typography>
                    )}
                    {showPreview && <ActionPreview {...previewProps} />}
                </Col>
                <Col flex={1} gap={16}>
                    {description && (
                        <Typography variant="body2Regular" light>
                            {description}
                        </Typography>
                    )}
                    {children}
                </Col>
            </Col>
        </ScrollView>
    );
};

export default ActionDetailsScaffold;
