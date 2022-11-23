import { ReactNode } from "react";
import { SummaryFieldRoot } from "./SummaryField.styles";
import Typography from "module/common/component/display/Typography/Typography";

export interface SummaryFieldProps {
    label: string;
    children: string | ReactNode;
}

const SummaryField = ({ label, children }: SummaryFieldProps): JSX.Element => {
    return (
        <SummaryFieldRoot variant="body2Strong" label={label}>
            {typeof children === "string" ? (
                <Typography testID="infoText" variant="body2Strong" numberOfLines={2}>
                    {children}
                </Typography>
            ) : (
                children
            )}
        </SummaryFieldRoot>
    );
};

export default SummaryField;
