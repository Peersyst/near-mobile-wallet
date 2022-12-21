import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import { EnhancedTransactionAction } from "../ActionCard/ActionCard.types";
import { useGetActionLabel } from "./hooks/useGetActionLabel/useGetActionLabel";

export interface ActionLabelProps extends Omit<TypographyProps, "children"> {
    action: EnhancedTransactionAction;
}

const ActionLabel = ({ action, ...typographyProps }: ActionLabelProps): JSX.Element => {
    const label = useGetActionLabel(action);
    return (
        <Typography {...typographyProps} color={(p) => p.gray[600]}>
            {label}
        </Typography>
    );
};

export default ActionLabel;
