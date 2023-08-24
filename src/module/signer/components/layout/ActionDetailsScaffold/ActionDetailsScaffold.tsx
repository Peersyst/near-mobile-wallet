import { Col } from "@peersyst/react-native-components";
import { ActionDetailsScaffoldProps } from "./ActionDetailsScaffold.types";
import Typography from "module/common/component/display/Typography/Typography";

const ActionDetailsScaffold = ({ header, description, children }: ActionDetailsScaffoldProps): JSX.Element => {
    return (
        <Col flex={1} gap={24} alignItems="center">
            <Typography variant="h4Strong" textAlign="center">
                {header}
            </Typography>
            <Col flex={1} gap={12}>
                <Typography variant="body2Regular" textAlign="center">
                    {description}
                </Typography>
                {children}
            </Col>
        </Col>
    );
};

export default ActionDetailsScaffold;