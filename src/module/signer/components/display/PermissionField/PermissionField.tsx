import { Row } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { PermissionFieldProps } from "./PermissionField.types";
import { PermissionIcons } from "./PermissionIcons";

const PermissionField = ({ label, type }: PermissionFieldProps): JSX.Element => {
    return (
        <Row gap={8}>
            {PermissionIcons[type]}
            <Typography variant="body2Strong" light={type === "forbidden"} style={{ flex: 1 }}>
                {label}
            </Typography>
        </Row>
    );
};

export default PermissionField;
