import { Col } from "react-native-components";
import { SummaryText } from "./SummaryField.styles";

export interface SummaryFieldProps {
    label: string;
    children: string;
}

const SummaryField = ({ label, children }: SummaryFieldProps): JSX.Element => {
    return (
        <Col gap={2}>
            <SummaryText variant="body2">{label}:</SummaryText>
            <SummaryText testID="infoText" variant="body1" style={{ paddingLeft: "5%" }} numberOfLines={2}>
                {children}
            </SummaryText>
        </Col>
    );
};

export default SummaryField;
