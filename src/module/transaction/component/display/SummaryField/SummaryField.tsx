import { ReactNode } from "react";
import { Col } from "@peersyst/react-native-components";
import { SummaryText } from "./SummaryField.styles";

export interface SummaryFieldProps {
    label: string;
    children: string | ReactNode;
}

const SummaryField = ({ label, children }: SummaryFieldProps): JSX.Element => {
    return (
        <Col gap={2} justifyContent="flex-start" style={{ width: "100%" }}>
            <SummaryText variant="body2">{label}:</SummaryText>
            {typeof children === "string" ? (
                <SummaryText testID="infoText" variant="body1" style={{ paddingLeft: "5%" }} numberOfLines={2}>
                    {children}
                </SummaryText>
            ) : (
                children
            )}
        </Col>
    );
};

export default SummaryField;
